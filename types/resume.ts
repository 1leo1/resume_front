export interface Location {
    address?: string;
    postalCode?: string;
    city?: string;
    countryCode?: string;
    region?: string;
}

export interface Profile {
    network: string;
    username: string;
    url: string;
}

// Placeholder interfaces for Template dependencies
export interface TemplateColumn {
    width: string;
    sections: string[];
}

export interface TemplateLayout {
    type: "single-column" | "two-column";
    columns: TemplateColumn[];
}

export interface TemplateStructure {
    layout: TemplateLayout;
    sections: Record<string, unknown>; // or more specific type if needed
}

export interface TemplateStyles {
    primary: string;
    accent: string;
    font: string;
}

export interface Template {
    id: number;
    slug: string;
    name: string;
    description: string;
    industry: string[];
    tags: string[];
    structure: TemplateStructure;
    styles: TemplateStyles;
    thumbnail_url?: string;
    dummy_data?: ResumeContent;
    is_premium: boolean;
}

export interface Basics {
    name: string;
    label?: string;
    image?: string;
    email?: string;
    phone?: string;
    url?: string;
    summary?: string;
    location?: Location;
    profiles?: Profile[];
}

export interface Work {
    name: string;
    position: string;
    url?: string;
    startDate?: string;
    endDate?: string;
    summary?: string;
    highlights?: string[];
    location?: string; // Extension for easier display
}

export interface Education {
    institution: string;
    url?: string;
    [key: string]: unknown;
    area: string;
    studyType: string;
    startDate?: string;
    endDate?: string;
    score?: string;
    courses?: string[];
}

export interface Skill {
    name: string;
    level?: string;
    keywords?: string[];
}

export interface Language {
    language: string;
    fluency?: string;
}

export interface Project {
    name: string;
    description?: string;
    highlights?: string[];
    keywords?: string[];
    startDate?: string;
    endDate?: string;
    url?: string;
    roles?: string[];
    entity?: string;
    type?: string;
}

export interface Award {
    title: string;
    date?: string;
    awarder?: string;
    summary?: string;
}

export interface Volunteer {
    organization: string;
    position: string;
    url?: string;
    startDate?: string;
    endDate?: string;
    summary?: string;
    highlights?: string[];
}

export interface Reference {
    name: string;
    reference: string;
}

export interface Publication {
    name: string;
    publisher?: string;
    releaseDate?: string;
    url?: string;
    summary?: string;
}

export interface CustomSectionItem {
    id: string;
    title: string;
    subtitle?: string;
    date?: string;
    description?: string;
}

export interface CustomSection {
    id: string;
    title: string;
    type: "list" | "detailed_list" | "text" | "gallery";
    items: CustomSectionItem[];
}

export interface ResumeContent {
    basics: Basics;
    work: Work[];
    education: Education[];
    skills: Skill[];
    languages: Language[];
    projects: Project[];
    awards: Award[];
    volunteer: Volunteer[];
    references: Reference[];
    publications: Publication[];
    custom_sections?: CustomSection[];
}

export interface ResumeDesign {
    layout: "single-column" | "two-column";
    theme: {
        primary: string;
        accent: string;
        font: string;
    };
    modules?: Record<string, unknown>;
}

export interface Resume {
    id?: number;
    title?: string;
    content: ResumeContent;
    design: ResumeDesign;
}
