export interface SectionConfig {
    id: string;
    isVisible: boolean;
    title: string;
    componentType: 'standard' | 'custom_list' | 'custom_grid';
}

export interface JobBlueprint {
    id: string;
    label: string;
    default_sections: string[];
    section_overrides: Record<string, { title?: string; visible?: boolean }>;
}

export interface UserSectionConfig {
    order: string[];
    hidden: string[];
    titles: Record<string, string>;
    custom_sections?: CustomSectionConfig[];
}

export interface CustomSectionConfig {
    id: string;
    name: string;
    type: 'list' | 'gallery' | 'tags';
}
