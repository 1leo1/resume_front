import { Template } from "@/types/resume";

export function normalizeTemplate(template: any): any {
    if (!template || !template.structure || !template.structure.layout) {
        return template;
    }

    // Deep copy to avoid mutating original
    const newTemplate = JSON.parse(JSON.stringify(template));

    // Helper to normalize ID
    const normalizeId = (id: string) => {
        const lower = id.toLowerCase();
        if (lower === 'contact') return 'header';
        if (lower === 'experience') return 'work';
        return id;
    };

    // Normalize columns
    newTemplate.structure.layout.columns = newTemplate.structure.layout.columns.map((col: any) => ({
        ...col,
        sections: col.sections.map(normalizeId)
    }));

    // Normalize sections map if it exists
    if (newTemplate.structure.sections) {
        const newSections: Record<string, any> = {};
        Object.entries(newTemplate.structure.sections).forEach(([key, value]: [string, any]) => {
            const newKey = normalizeId(key);
            newSections[newKey] = {
                ...value,
                id: newKey
            };
        });
        newTemplate.structure.sections = newSections;
    }

    return newTemplate;
}
