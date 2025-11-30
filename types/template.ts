export interface SectionConfig {
    id: string;
    type: string; // "header", "summary", "experience", "education", "skills", "custom"
    title: string;
    icon?: string;
}

export interface ColumnConfig {
    width: string;
    sections: string[]; // List of section IDs
}

export interface LayoutConfig {
    type: "single-column" | "two-column";
    columns: ColumnConfig[];
}

export interface TemplateStyles {
    primary: string;
    accent: string;
    font: string;
    background?: string;
}

export interface Template {
    id: number;
    slug: string;
    name: string;
    description?: string;
    industry: string;
    structure: {
        layout: LayoutConfig;
        sections: Record<string, SectionConfig>;
    };
    styles: TemplateStyles;
    thumbnail_url?: string;
}
