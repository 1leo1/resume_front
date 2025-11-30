import { create } from 'zustand';
import { ResumeContent, ResumeDesign } from '@/types/resume';
import { Work, Education, Skill, Language, Project, Award, Volunteer } from '@/types/resume';

interface ResumeStore {
    resumeData: ResumeContent;
    design: ResumeDesign;
    setResumeData: (data: ResumeContent) => void;
    setDesign: (design: ResumeDesign) => void;
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

    // Dynamic Sections
    activeSections: string[];
    addSection: (sectionId: string) => void;
    removeSection: (sectionId: string) => void;
    reorderSections: (newOrder: string[]) => void;

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

export const useResumeStore = create<ResumeStore>((set) => ({
    resumeData: initialContent,
    design: initialDesign,
    activeSections: ["work", "education", "skills"], // Default sections
    setResumeData: (data) => set({ resumeData: data }),
    setDesign: (design) => set({ design }),

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
    addSection: (sectionId) =>
        set((state) => ({
            activeSections: state.activeSections.includes(sectionId)
                ? state.activeSections
                : [...state.activeSections, sectionId]
        })),

    removeSection: (sectionId) =>
        set((state) => ({
            activeSections: state.activeSections.filter((id) => id !== sectionId)
        })),

    reorderSections: (newOrder) =>
        set(() => ({
            activeSections: newOrder
        })),

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
