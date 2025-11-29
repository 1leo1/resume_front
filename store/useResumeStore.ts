import { create } from 'zustand';

export interface Education {
    institution: string;
    degree: string;
    start_date: string;
    end_date: string;
    description: string;
}

export interface Experience {
    company: string;
    position: string;
    start_date: string;
    end_date: string;
    description: string;
}

export interface Skill {
    name: string;
    level: string;
}

export interface ResumeData {
    name: string;
    email: string;
    phone: string;
    summary: string;
    education: Education[];
    experience: Experience[];
    skills: Skill[];
}

interface ResumeStore {
    resumeData: ResumeData;
    setResumeData: (data: ResumeData) => void;
    updateField: (field: keyof ResumeData, value: any) => void;
    addExperience: () => void;
    addEducation: () => void;
    addSkill: () => void;
}

const initialData: ResumeData = {
    name: "",
    email: "",
    phone: "",
    summary: "",
    education: [],
    experience: [],
    skills: []
};

export const useResumeStore = create<ResumeStore>((set) => ({
    resumeData: initialData,
    setResumeData: (data) => set({ resumeData: data }),
    updateField: (field, value) =>
        set((state) => ({ resumeData: { ...state.resumeData, [field]: value } })),
    addExperience: () =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                experience: [...state.resumeData.experience, { company: "", position: "", start_date: "", end_date: "", description: "" }]
            }
        })),
    addEducation: () =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                education: [...state.resumeData.education, { institution: "", degree: "", start_date: "", end_date: "", description: "" }]
            }
        })),
    addSkill: () =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                skills: [...state.resumeData.skills, { name: "", level: "" }]
            }
        })),
}));
