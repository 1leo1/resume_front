import { X, Plus, Briefcase, GraduationCap, Globe, FolderGit2, Award, Heart, BookOpen, Users, PlusCircle, User, FileText, Mail } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";
import { motion } from "framer-motion";
import Image from "next/image";

interface AddSectionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SECTION_IMAGES: Record<string, string> = {
    header: "/section-icons/work.png", // Fallback
    summary: "/section-icons/work.png", // Fallback
    work: "/section-icons/work.png",
    education: "/section-icons/education.png",
    skills: "/section-icons/skills.png",
    languages: "/section-icons/languages.png",
    projects: "/section-icons/projects.png",
    awards: "/section-icons/awards.png",
    volunteer: "/section-icons/volunteer.png",
    references: "/section-icons/volunteer.png", // Fallback
};

const AVAILABLE_SECTIONS = [
    { id: "header", label: "Personal Info", icon: User, description: "Name, title" },
    { id: "summary", label: "Summary", icon: FileText, description: "Professional summary" },
    { id: "work", label: "Experience", icon: Briefcase, description: "Work history" },
    { id: "education", label: "Education", icon: GraduationCap, description: "Degrees" },
    { id: "skills", label: "Skills", icon: BookOpen, description: "Competencies" },
    { id: "languages", label: "Languages", icon: Globe, description: "Spoken languages" },
    { id: "projects", label: "Projects", icon: FolderGit2, description: "Side projects" },
    { id: "awards", label: "Awards", icon: Award, description: "Achievements" },
    { id: "volunteer", label: "Volunteering", icon: Heart, description: "Community work" },
    { id: "references", label: "References", icon: Users, description: "Endorsements" },
];

export default function AddSectionModal({ isOpen, onClose }: AddSectionModalProps) {
    const { sectionConfig, addSection } = useResumeStore();

    // Helper to check if section is active (in order and not hidden)
    const isSectionActive = (id: string) => {
        return sectionConfig.order.includes(id) && !sectionConfig.hidden.includes(id);
    };

    if (!isOpen) return null;

    const handleAdd = (sectionId: string) => {
        addSection(sectionId);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[85vh]"
            >
                <div className="p-6 border-b dark:border-gray-800 flex items-center justify-between shrink-0 bg-gray-50/50 dark:bg-gray-900">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add Section</h2>
                        <p className="text-gray-500 mt-1">Enhance your resume with additional sections</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto bg-gray-50 dark:bg-gray-950">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...AVAILABLE_SECTIONS]
                            .sort((a, b) => {
                                const aAdded = isSectionActive(a.id);
                                const bAdded = isSectionActive(b.id);
                                if (aAdded === bAdded) return 0;
                                return aAdded ? 1 : -1;
                            })
                            .map((section) => {
                                const isAdded = isSectionActive(section.id);
                                const Icon = section.icon;

                                return (
                                    <motion.button
                                        key={section.id}
                                        onClick={() => !isAdded && handleAdd(section.id)}
                                        disabled={isAdded}
                                        whileHover={!isAdded ? { y: -4 } : {}}
                                        className={`group relative flex flex-col text-left rounded-xl overflow-hidden transition-all shadow-sm hover:shadow-md ${isAdded
                                            ? "opacity-60 cursor-not-allowed grayscale"
                                            : "bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-blue-500 dark:hover:ring-blue-500"
                                            }`}
                                    >
                                        {/* Preview Area */}
                                        <div className="h-32 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex flex-col justify-center items-center relative overflow-hidden p-4">
                                            <div className="relative w-20 h-20 transform transition-transform group-hover:scale-110 duration-500">
                                                <Image
                                                    src={SECTION_IMAGES[section.id]}
                                                    alt={section.label}
                                                    fill
                                                    className="object-contain drop-shadow-md"
                                                />
                                            </div>

                                            {/* Add Overlay on Hover */}
                                            {!isAdded && (
                                                <div className="absolute inset-0 bg-white/60 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                                                    <motion.div
                                                        initial={{ scale: 0.5, opacity: 0 }}
                                                        whileHover={{ scale: 1.1 }}
                                                        className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl"
                                                    >
                                                        <Plus className="w-7 h-7" />
                                                    </motion.div>
                                                </div>
                                            )}

                                            {/* Added Badge */}
                                            {isAdded && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100/60 dark:bg-gray-900/60 backdrop-blur-[2px]">
                                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold border border-green-200 shadow-sm flex items-center gap-1">
                                                        <Plus className="w-3 h-3 rotate-45" /> Added
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Info Area */}
                                        <div className="p-4 flex items-center gap-3">
                                            <div className={`p-2.5 rounded-lg ${isAdded
                                                ? "bg-gray-100 text-gray-400 dark:bg-gray-800"
                                                : "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors"
                                                }`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                                    {section.label}
                                                </h3>
                                                <p className="text-xs text-gray-500 mt-0.5">{section.description}</p>
                                            </div>

                                            {!isAdded && (
                                                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <PlusCircle className="w-5 h-5 text-blue-500" />
                                                </div>
                                            )}
                                        </div>
                                    </motion.button>
                                );
                            })}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
