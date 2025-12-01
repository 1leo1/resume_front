import React from 'react';
import { ResumeContent, TemplateStructure, TemplateStyles } from '@/types/resume';
import { getSectionComponent } from './SectionRegistry';

import { DndContext, closestCenter, DragEndEvent, useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface Props {
    content: ResumeContent;
    structure: TemplateStructure;
    styles: TemplateStyles;
    sectionConfig?: {
        order: string[];
        hidden: string[];
        titles: Record<string, string>;
    };
    isInteractive?: boolean;
    focusedSection?: string | null;
    onReorder?: (newOrder: string[]) => void;
    onEdit?: (sectionId: string) => void;
    onContentChange?: (sectionId: string, data: any) => void;
}

function SortableSection({ id, children, isInteractive, isFocused }: { id: string, children: React.ReactNode, isInteractive?: boolean, isFocused?: boolean }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        position: 'relative' as const,
        zIndex: isDragging ? 100 : 1,
    };

    if (!isInteractive) return <div className="mb-6" data-section-id={id}>{children}</div>;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group relative mb-6 transition-all duration-300 rounded-lg ${isFocused
                ? 'ring-2 ring-blue-500 ring-offset-2 bg-blue-50/50'
                : ''
                }`}
            data-section-id={id}
        >
            {isInteractive && (
                <div
                    {...attributes}
                    {...listeners}
                    className="absolute -left-8 top-0 bottom-0 w-6 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing text-gray-400 hover:text-blue-500 transition-opacity z-20"
                    title="Drag to reorder"
                >
                    <GripVertical size={16} />
                </div>
            )}
            {children}
        </div>
    );
}

export default function ResumeRenderer({ content, structure, styles, sectionConfig, isInteractive = false, focusedSection, onReorder, onEdit, onContentChange }: Props) {
    const cssVars = {
        '--primary-color': styles.primary,
        '--accent-color': styles.accent,
        '--text-color': '#333',
        '--font-body': styles.font,
        '--font-header': styles.font,
    } as React.CSSProperties;

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id && onReorder && sectionConfig?.order) {
            const oldIndex = sectionConfig.order.indexOf(active.id as string);
            const newIndex = sectionConfig.order.indexOf(over?.id as string);
            if (oldIndex !== -1 && newIndex !== -1) {
                onReorder(arrayMove(sectionConfig.order, oldIndex, newIndex));
            }
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div
                className="resume-canvas bg-white shadow-xl mx-auto"
                style={{
                    ...cssVars,
                    width: '210mm',
                    minHeight: '297mm',
                    padding: '2rem',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-color)'
                }}
            >
                <div className="resume-grid" style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>

                    {structure.layout.columns.map((col, index) => {
                        let columnSections = [...col.sections];

                        const isMainColumn = index === structure.layout.columns.length - 1;

                        if (isMainColumn && sectionConfig?.order) {
                            const allStructureSections = structure.layout.columns.flatMap(c => c.sections);
                            const orphanSections = sectionConfig.order.filter(id => !allStructureSections.includes(id));
                            columnSections = [...columnSections, ...orphanSections];
                        }

                        const sortedSections = Array.from(new Set(columnSections)).sort((a, b) => {
                            if (!sectionConfig?.order) return 0;
                            const idxA = sectionConfig.order.indexOf(a);
                            const idxB = sectionConfig.order.indexOf(b);
                            if (idxA === -1) return 1;
                            if (idxB === -1) return -1;
                            return idxA - idxB;
                        });

                        return (
                            <div
                                key={index}
                                className="resume-column"
                                style={{
                                    width: col.width,
                                    borderRight: index === 0 && structure.layout.type === 'two-column' ? '1px solid #eee' : 'none',
                                    paddingRight: index === 0 && structure.layout.type === 'two-column' ? '1rem' : '0',
                                    paddingLeft: index === 1 && structure.layout.type === 'two-column' ? '1rem' : '0'
                                }}
                            >
                                <SortableContext items={sortedSections} strategy={verticalListSortingStrategy}>
                                    {sortedSections.map((sectionId) => {
                                        if (sectionConfig?.hidden?.includes(sectionId)) {
                                            return null;
                                        }

                                        const SectionComponent = getSectionComponent(sectionId);
                                        let sectionData: any = content[sectionId as keyof ResumeContent];

                                        if (sectionId === 'header') {
                                            sectionData = content.basics;
                                        } else if (sectionId === 'summary') {
                                            sectionData = content.basics?.summary || (content as any).summary;
                                        } else if (sectionId === 'experience' && !sectionData) {
                                            sectionData = content.work;
                                        }

                                        if (!sectionData) {
                                            sectionData = [];
                                        }

                                        return (
                                            <SortableSection
                                                key={sectionId}
                                                id={sectionId}
                                                isInteractive={isInteractive}
                                                isFocused={focusedSection === sectionId}
                                            >
                                                <SectionComponent
                                                    data={sectionData}
                                                    styles={{
                                                        colors: { primary: styles.primary, accent: styles.accent, text: '#333' },
                                                        fontFamily: { header: styles.font, body: styles.font },
                                                        spacing: { section: '1.5rem' }
                                                    }}
                                                    isEditable={isInteractive}
                                                    onContentChange={(newData: any) => onContentChange?.(sectionId, newData)}
                                                />
                                            </SortableSection>
                                        );
                                    })}
                                </SortableContext>
                            </div>
                        );
                    })}
                </div>
            </div>
        </DndContext>
    );
}
