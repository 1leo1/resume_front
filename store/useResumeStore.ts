import { create } from 'zustand';
import { ResumeContent, ResumeDesign, Template } from '@/types/resume';
import { Work, Education, Skill, Language, Project, Award, Volunteer } from '@/types/resume';

interface ResumeStore {
    resumeData: ResumeContent;
    design: ResumeDesign;
    resumeId: number | null;
    focusedSection: string | null;
    activeSections: string[];
    setResumeData: (data: ResumeContent) => void;
    setDesign: (design: ResumeDesign) => void;
    setResumeId: (id: number) => void;
    setFocusedSection: (sectionId: string | null) => void;
    removeSection: (sectionId: string) => void;
    updateBasics: (field: keyof ResumeContent["basics"], value: unknown) => void;
    // Work Experience
    addWork: (work: Work) => void;
    updateWork: (index: number, field: keyof Work, value: string) => void;
    removeWork: (index: number) => void;
    // Education
    addEducation: (education: Education) => void;
    updateEducation: (index: number, field: keyof Education, value: string) => void;
    removeEducation: (index: number) => void;
    addSkill: (name?: string) => void;
    updateSkill: (index: number, field: string, value: unknown) => void;
    removeSkill: (index: number) => void;

    // Template Management
    setTemplate: (template: Template) => void;

    // Section Configuration
    sectionConfig: {
        order: string[];
        hidden: string[];
        titles: Record<string, string>;
    };
    setSectionConfig: (config: any) => void;
    toggleSectionVisibility: (sectionId: string) => void;
    renameSection: (sectionId: string, title: string) => void;
    reorderSections: (newOrder: string[]) => void;
    addSection: (sectionId: string) => void;

    // New Section Actions
    addLanguage: (language: Language) => void;
    removeLanguage: (index: number) => void;
    addProject: (project: Project) => void;
    removeProject: (index: number) => void;
    addAward: (award: Award) => void;
    removeAward: (index: number) => void;
    addVolunteer: (volunteer: Volunteer) => void;
    removeVolunteer: (index: number) => void;
}

const initialContent: ResumeContent = {
    basics: {
        name: "",
        email: "",
        phone: "",
        summary: "",
        location: {}
    },
    work: [],
    education: [],
    skills: [],
    languages: [],
    projects: [],
    awards: [],
    volunteer: [],
    references: [],
    publications: []
};

const initialDesign: ResumeDesign = {
    layout: "two-column",
    theme: {
        primary: "blue-600",
        accent: "blue-100",
        font: "inter"
    }
};

export const useResumeStore = create<ResumeStore>((set, get) => ({
    resumeData: initialContent,
    design: initialDesign,
    resumeId: null,
    focusedSection: null,
    activeSections: ["header", "summary", "work", "education", "skills", "projects"],
    sectionConfig: {
        order: ["header", "summary", "work", "education", "skills", "projects"],
        hidden: [],
        titles: {}
    },
    setResumeData: (data) => set({ resumeData: data }),
    setDesign: (design) => set({ design }),
    setResumeId: (id) => set({ resumeId: id }),
    setFocusedSection: (sectionId) => set({ focusedSection: sectionId }),
    removeSection: (sectionId) => set((state) => ({
        sectionConfig: {
            ...state.sectionConfig,
            hidden: [...state.sectionConfig.hidden, sectionId]
        }
    })),

    setTemplate: (template) =>
        set((state) => {
            // 1. Update Design Layout
            const newDesign = {
                ...state.design,
                layout: template.structure.layout.type as "single-column" | "two-column",
            };

            // 2. Update Section Config Order based on Template
            // Extract all sections from the new template's columns
            const templateSections = template.structure.layout.columns.flatMap(
                (col: any) => col.sections
            );

            return {
                design: newDesign,
                sectionConfig: {
                    ...state.sectionConfig,
                    order: templateSections
                }
            };
        }),

    updateBasics: (field, value) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                basics: { ...state.resumeData.basics, [field]: value }
            }
        })),

    addWork: (work) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                work: [...state.resumeData.work, work]
            }
        })),

    updateWork: (index, field, value) =>
        set((state) => {
            const newWork = [...state.resumeData.work];
            newWork[index] = { ...newWork[index], [field]: value };
            return { resumeData: { ...state.resumeData, work: newWork } };
        }),

    removeWork: (index) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                work: state.resumeData.work.filter((_, i) => i !== index)
            }
        })),

    addEducation: (education) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                education: [...state.resumeData.education, education]
            }
        })),

    updateEducation: (index, field, value) =>
        set((state) => {
            const newEdu = [...state.resumeData.education];
            newEdu[index] = { ...newEdu[index], [field]: value };
            return { resumeData: { ...state.resumeData, education: newEdu } };
        }),

    removeEducation: (index) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                education: state.resumeData.education.filter((_, i) => i !== index)
            }
        })),

    addSkill: (name = "") =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                skills: [...state.resumeData.skills, { name, level: "" }]
            }
        })),

    updateSkill: (index, field, value) =>
        set((state) => {
            const newSkills = [...state.resumeData.skills];
            newSkills[index] = { ...newSkills[index], [field]: value };
            return { resumeData: { ...state.resumeData, skills: newSkills } };
        }),

    removeSkill: (index) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                skills: state.resumeData.skills.filter((_, i) => i !== index)
            }
        })),

    // Section Management
    // Section Management
    setSectionConfig: (config) => set({ sectionConfig: config }),

    toggleSectionVisibility: (sectionId) =>
        set((state) => {
            const isHidden = state.sectionConfig.hidden.includes(sectionId);
            return {
                sectionConfig: {
                    ...state.sectionConfig,
                    hidden: isHidden
                        ? state.sectionConfig.hidden.filter(id => id !== sectionId)
                        : [...state.sectionConfig.hidden, sectionId]
                }
            };
        }),

    renameSection: (sectionId, title) =>
        set((state) => ({
            sectionConfig: {
                ...state.sectionConfig,
                titles: {
                    ...state.sectionConfig.titles,
                    [sectionId]: title
                }
            }
        })),

    reorderSections: (newOrder) =>
        set((state) => ({
            sectionConfig: {
                ...state.sectionConfig,
                order: newOrder
            }
        })),

    addSection: (sectionId: string) =>
        set((state) => {
            const currentOrder = state.sectionConfig.order;
            const isAlreadyInOrder = currentOrder.includes(sectionId);

            // If already in order, just ensure it's visible
            // If not in order, append it and ensure visible

            return {
                sectionConfig: {
                    ...state.sectionConfig,
                    order: isAlreadyInOrder ? currentOrder : [...currentOrder, sectionId],
                    hidden: state.sectionConfig.hidden.filter(id => id !== sectionId)
                }
            };
        }),

    // New Section Implementations
    addLanguage: (language) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                languages: [...state.resumeData.languages, language]
            }
        })),

    removeLanguage: (index) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                languages: state.resumeData.languages.filter((_, i) => i !== index)
            }
        })),

    addProject: (project) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                projects: [...state.resumeData.projects, project]
            }
        })),

    removeProject: (index) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                projects: state.resumeData.projects.filter((_, i) => i !== index)
            }
        })),

    addAward: (award) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                awards: [...state.resumeData.awards, award]
            }
        })),

    removeAward: (index) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                awards: state.resumeData.awards.filter((_, i) => i !== index)
            }
        })),

    addVolunteer: (volunteer) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                volunteer: [...state.resumeData.volunteer, volunteer]
            }
        })),

    removeVolunteer: (index) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                volunteer: state.resumeData.volunteer.filter((_, i) => i !== index)
            }
        })),
}));
