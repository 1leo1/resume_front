import React from 'react';
import { JobBlueprint } from '@/types/blueprint';
import { Briefcase } from 'lucide-react';

interface Props {
    blueprints: JobBlueprint[];
    selectedBlueprintId: string;
    onSelect: (blueprint: JobBlueprint) => void;
}

export default function BlueprintSelector({ blueprints, selectedBlueprintId, onSelect }: Props) {
    return (
        <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Job Type</h3>
            <div className="space-y-2">
                {blueprints.map((bp) => (
                    <button
                        key={bp.id}
                        onClick={() => onSelect(bp)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${selectedBlueprintId === bp.id
                                ? 'bg-blue-50 border-blue-200 text-blue-700'
                                : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300'
                            }`}
                    >
                        <div className={`p-2 rounded-full ${selectedBlueprintId === bp.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            <Briefcase size={16} className={selectedBlueprintId === bp.id ? 'text-blue-600' : 'text-gray-500'} />
                        </div>
                        <span className="text-sm font-medium">{bp.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
