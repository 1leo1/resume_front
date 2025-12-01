'use client';

import React from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff, Edit2 } from 'lucide-react';

interface SectionItem {
    id: string;
    title: string;
    isVisible: boolean;
}

interface Props {
    sections: SectionItem[];
    onReorder: (newOrder: string[]) => void;
    onToggle: (id: string) => void;
    onRename: (id: string, newTitle: string) => void;
}

function SortableItem({ id, section, onToggle, onRename }: { id: string, section: SectionItem, onToggle: any, onRename: any }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [isEditing, setIsEditing] = React.useState(false);
    const [editTitle, setEditTitle] = React.useState(section.title);

    const handleRename = () => {
        onRename(id, editTitle);
        setIsEditing(false);
    };

    return (
        <div ref={setNodeRef} style={style} className="flex items-center justify-between p-3 mb-2 bg-white border rounded shadow-sm">
            <div className="flex items-center gap-2 flex-1">
                <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600">
                    <GripVertical size={16} />
                </div>

                {isEditing ? (
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={handleRename}
                        onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                        className="border rounded px-1 py-0.5 text-sm w-full"
                        autoFocus
                    />
                ) : (
                    <span className={`text-sm font-medium ${!section.isVisible ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                        {section.title}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-2">
                <button onClick={() => setIsEditing(!isEditing)} className="text-gray-400 hover:text-blue-500">
                    <Edit2 size={14} />
                </button>
                <button onClick={() => onToggle(id)} className={`${section.isVisible ? 'text-gray-600 hover:text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}>
                    {section.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
            </div>
        </div>
    );
}

export default function SectionManager({ sections, onReorder, onToggle, onRename }: Props) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = sections.findIndex((s) => s.id === active.id);
            const newIndex = sections.findIndex((s) => s.id === over?.id);

            const newOrder = arrayMove(sections, oldIndex, newIndex).map(s => s.id);
            onReorder(newOrder);
        }
    }

    return (
        <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Sections</h3>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={sections.map(s => s.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {sections.map((section) => (
                        <SortableItem
                            key={section.id}
                            id={section.id}
                            section={section}
                            onToggle={onToggle}
                            onRename={onRename}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
}
