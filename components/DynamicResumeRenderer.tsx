"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { useShallow } from 'zustand/react/shallow';
import { Template } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Plus, Trash2, GripVertical } from "lucide-react";
import EditableElement from "./EditableElement";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable Item Wrapper
function SortableSection({ id, children }: { id: string; children: React.ReactNode }) {
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
        zIndex: isDragging ? 50 : "auto",
        position: "relative" as const,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className="group/section relative mb-6">
            <div
                {...attributes}
                {...listeners}
                className="absolute -left-8 top-0 p-2 cursor-grab opacity-0 group-hover/section:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity"
            >
                <GripVertical className="w-5 h-5" />
            </div>
            {children}
        </div>
    );
}

export default function DynamicResumeRenderer({ template }: { template: Template }) {
    const {
        resumeData,
        design,
        activeSections,
        reorderSections,
        removeSection,
        updateBasics,
        // Work
        work, addWork, updateWork, removeWork,
        // Education
        education, addEducation, updateEducation, removeEducation,
        // Skills
        skills, addSkill, updateSkill, removeSkill,
        // Languages
        languages, addLanguage, removeLanguage,
        // Projects
        projects, addProject, removeProject,
        // Awards
        awards, addAward, removeAward,
        // Volunteer
        volunteer, addVolunteer, removeVolunteer
    } = useResumeStore(useShallow((state) => ({
        resumeData: state.resumeData,
        design: state.design,
        activeSections: state.activeSections,
        reorderSections: state.reorderSections,
        removeSection: state.removeSection,
        updateBasics: state.updateBasics,
        // Work
        work: state.resumeData.work,
        addWork: state.addWork,
        updateWork: state.updateWork,
        removeWork: state.removeWork,
        // Education
        education: state.resumeData.education,
        addEducation: state.addEducation,
        updateEducation: state.updateEducation,
        removeEducation: state.removeEducation,
        // Skills
        skills: state.resumeData.skills,
        addSkill: state.addSkill,
        updateSkill: state.updateSkill,
        removeSkill: state.removeSkill,
        // Languages
        languages: state.resumeData.languages,
        addLanguage: state.addLanguage,
        removeLanguage: state.removeLanguage,
        // Projects
        projects: state.resumeData.projects,
        addProject: state.addProject,
        removeProject: state.removeProject,
        // Awards
        awards: state.resumeData.awards,
        addAward: state.addAward,
        removeAward: state.removeAward,
        // Volunteer
        volunteer: state.resumeData.volunteer,
        addVolunteer: state.addVolunteer,
        removeVolunteer: state.removeVolunteer
    })));

    const { basics } = resumeData;
    const { styles } = template;

    // Use template styles or store design overrides
    const primaryColor = design.theme?.primary || styles.primary || "gray-900";
    const accentColor = design.theme?.accent || styles.accent || "gray-100";
    const fontValue = design.theme?.font || styles.font || "inter";

    // Map font values to CSS variables
    const fontStyle = {
        fontFamily: `var(--font-${fontValue}), sans-serif`
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = activeSections.indexOf(active.id as string);
            const newIndex = activeSections.indexOf(over.id as string);
            reorderSections(arrayMove(activeSections, oldIndex, newIndex));
        }
    };

    const SectionHeader = ({ title, onAdd, onRemove }: { title: string, onAdd?: () => void, onRemove?: () => void }) => (
        <h2 className={`text-xl font-bold text-${primaryColor} border-b-2 border-${accentColor} pb-2 mb-3 flex justify-between items-center group`}>
            {title}
            <div className="flex items-center gap-2">
                {onAdd && (
                    <button
                        onClick={onAdd}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded text-gray-500 transition-all"
                        title="Add Item"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                )}
                {onRemove && (
                    <button
                        onClick={onRemove}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 text-red-400 hover:text-red-600 rounded transition-all"
                        title="Remove Section"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
            </div>
        </h2>
    );

    const renderSection = (sectionId: string) => {
        switch (sectionId) {
            case "work":
                return (
                    <section key="work">
                        <SectionHeader
                            title="Work Experience"
                            onAdd={() => addWork({
                                name: "Company Name",
                                position: "Job Title",
                                startDate: "2023",
                                endDate: "Present",
                                summary: "Description of your role and achievements.",
                                highlights: []
                            })}
                            onRemove={() => removeSection("work")}
                        />
                        <div className="space-y-4">
                            {work.map((job, index) => (
                                <div key={index} className="group relative pl-2 -ml-2 border-l-2 border-transparent hover:border-blue-200 transition-colors">
                                    <button onClick={() => removeWork(index)} className="absolute -right-6 top-0 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 p-1">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <EditableElement value={job.position || ""} onChange={(val) => updateWork(index, "position", val)} tagName="h3" className="font-bold text-gray-900" placeholder="Job Title" />
                                        <div className="flex gap-1 text-sm text-gray-500 whitespace-nowrap">
                                            <EditableElement value={job.startDate || ""} onChange={(val) => updateWork(index, "startDate", val)} placeholder="Start" />
                                            <span>–</span>
                                            <EditableElement value={job.endDate || ""} onChange={(val) => updateWork(index, "endDate", val)} placeholder="End" />
                                        </div>
                                    </div>
                                    <div className="text-blue-600 font-medium text-sm mb-2">
                                        <EditableElement value={job.name || ""} onChange={(val) => updateWork(index, "name", val)} placeholder="Company" />
                                    </div>
                                    <EditableElement value={job.summary || ""} onChange={(val) => updateWork(index, "summary", val)} multiline className="text-sm text-gray-700 whitespace-pre-line w-full" placeholder="Job description..." />
                                </div>
                            ))}
                        </div>
                    </section>
                );

            case "education":
                return (
                    <section key="education">
                        <SectionHeader
                            title="Education"
                            onAdd={() => addEducation({
                                institution: "University Name",
                                area: "Major",
                                studyType: "Degree",
                                startDate: "2019",
                                endDate: "2023",
                                score: "",
                                courses: []
                            })}
                            onRemove={() => removeSection("education")}
                        />
                        <div className="space-y-3">
                            {education.map((edu, index) => (
                                <div key={index} className="group relative pl-2 -ml-2 border-l-2 border-transparent hover:border-blue-200 transition-colors">
                                    <button onClick={() => removeEducation(index)} className="absolute -right-6 top-0 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 p-1">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="flex justify-between items-baseline">
                                        <EditableElement value={edu.institution || ""} onChange={(val) => updateEducation(index, "institution", val)} tagName="h3" className="font-bold text-gray-900" placeholder="Institution" />
                                        <div className="flex gap-1 text-sm text-gray-500 whitespace-nowrap">
                                            <EditableElement value={edu.startDate || ""} onChange={(val) => updateEducation(index, "startDate", val)} placeholder="Start" />
                                            <span>–</span>
                                            <EditableElement value={edu.endDate || ""} onChange={(val) => updateEducation(index, "endDate", val)} placeholder="End" />
                                        </div>
                                    </div>
                                    <div className="text-gray-700 flex gap-1">
                                        <EditableElement value={edu.studyType || ""} onChange={(val) => updateEducation(index, "studyType", val)} placeholder="Degree" />
                                        <span>in</span>
                                        <EditableElement value={edu.area || ""} onChange={(val) => updateEducation(index, "area", val)} placeholder="Field of Study" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                );

            case "skills":
                return (
                    <section key="skills">
                        <SectionHeader
                            title="Skills"
                            onAdd={() => addSkill("New Skill")}
                            onRemove={() => removeSection("skills")}
                        />
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <div key={index} className="group relative">
                                    <span className={`px-3 py-1 rounded-full bg-${accentColor} text-${primaryColor} text-sm font-medium flex items-center gap-1`}>
                                        <EditableElement value={skill.name || ""} onChange={(val) => updateSkill(index, "name", val)} placeholder="Skill" className="min-w-[20px]" />
                                        <button onClick={() => removeSkill(index)} className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity">
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                );

            case "languages":
                return (
                    <section key="languages">
                        <SectionHeader
                            title="Languages"
                            onAdd={() => addLanguage({ language: "Language", fluency: "Fluency" })}
                            onRemove={() => removeSection("languages")}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            {languages.map((lang, index) => (
                                <div key={index} className="group relative flex justify-between items-center p-2 border rounded hover:border-blue-200">
                                    <div>
                                        <EditableElement value={lang.language} onChange={(val) => {
                                            const newLangs = [...languages];
                                            newLangs[index].language = val;
                                            useResumeStore.setState({ resumeData: { ...resumeData, languages: newLangs } });
                                        }} className="font-medium text-gray-900" placeholder="Language" />
                                        <EditableElement value={lang.fluency || ""} onChange={(val) => {
                                            const newLangs = [...languages];
                                            newLangs[index].fluency = val;
                                            useResumeStore.setState({ resumeData: { ...resumeData, languages: newLangs } });
                                        }} className="text-sm text-gray-500" placeholder="Fluency" />
                                    </div>
                                    <button onClick={() => removeLanguage(index)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                );

            case "projects":
                return (
                    <section key="projects">
                        <SectionHeader
                            title="Projects"
                            onAdd={() => addProject({ name: "Project Name", description: "Project description", startDate: "2023", endDate: "Present" })}
                            onRemove={() => removeSection("projects")}
                        />
                        <div className="space-y-4">
                            {projects.map((proj, index) => (
                                <div key={index} className="group relative pl-2 -ml-2 border-l-2 border-transparent hover:border-blue-200 transition-colors">
                                    <button onClick={() => removeProject(index)} className="absolute -right-6 top-0 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 p-1">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <EditableElement value={proj.name} onChange={(val) => {
                                            const newProjs = [...projects];
                                            newProjs[index].name = val;
                                            useResumeStore.setState({ resumeData: { ...resumeData, projects: newProjs } });
                                        }} tagName="h3" className="font-bold text-gray-900" placeholder="Project Name" />
                                        <div className="flex gap-1 text-sm text-gray-500 whitespace-nowrap">
                                            <EditableElement value={proj.startDate || ""} onChange={(val) => {
                                                const newProjs = [...projects];
                                                newProjs[index].startDate = val;
                                                useResumeStore.setState({ resumeData: { ...resumeData, projects: newProjs } });
                                            }} placeholder="Start" />
                                            <span>–</span>
                                            <EditableElement value={proj.endDate || ""} onChange={(val) => {
                                                const newProjs = [...projects];
                                                newProjs[index].endDate = val;
                                                useResumeStore.setState({ resumeData: { ...resumeData, projects: newProjs } });
                                            }} placeholder="End" />
                                        </div>
                                    </div>
                                    <EditableElement value={proj.description || ""} onChange={(val) => {
                                        const newProjs = [...projects];
                                        newProjs[index].description = val;
                                        useResumeStore.setState({ resumeData: { ...resumeData, projects: newProjs } });
                                    }} multiline className="text-sm text-gray-700 whitespace-pre-line w-full" placeholder="Project description..." />
                                </div>
                            ))}
                        </div>
                    </section>
                );

            case "awards":
                return (
                    <section key="awards">
                        <SectionHeader
                            title="Awards"
                            onAdd={() => addAward({ title: "Award Title", date: "2023", awarder: "Issuer" })}
                            onRemove={() => removeSection("awards")}
                        />
                        <div className="space-y-2">
                            {awards.map((award, index) => (
                                <div key={index} className="group relative flex justify-between items-start p-2 border-b border-gray-50 hover:bg-gray-50">
                                    <div className="flex-1">
                                        <EditableElement value={award.title} onChange={(val) => {
                                            const newAwards = [...awards];
                                            newAwards[index].title = val;
                                            useResumeStore.setState({ resumeData: { ...resumeData, awards: newAwards } });
                                        }} className="font-medium text-gray-900" placeholder="Award Title" />
                                        <div className="flex gap-2 text-sm text-gray-500">
                                            <EditableElement value={award.awarder || ""} onChange={(val) => {
                                                const newAwards = [...awards];
                                                newAwards[index].awarder = val;
                                                useResumeStore.setState({ resumeData: { ...resumeData, awards: newAwards } });
                                            }} placeholder="Issuer" />
                                            <span>•</span>
                                            <EditableElement value={award.date || ""} onChange={(val) => {
                                                const newAwards = [...awards];
                                                newAwards[index].date = val;
                                                useResumeStore.setState({ resumeData: { ...resumeData, awards: newAwards } });
                                            }} placeholder="Date" />
                                        </div>
                                    </div>
                                    <button onClick={() => removeAward(index)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                );

            case "volunteer":
                return (
                    <section key="volunteer">
                        <SectionHeader
                            title="Volunteering"
                            onAdd={() => addVolunteer({ organization: "Organization", position: "Role", startDate: "2023", endDate: "Present" })}
                            onRemove={() => removeSection("volunteer")}
                        />
                        <div className="space-y-4">
                            {volunteer.map((vol, index) => (
                                <div key={index} className="group relative pl-2 -ml-2 border-l-2 border-transparent hover:border-blue-200 transition-colors">
                                    <button onClick={() => removeVolunteer(index)} className="absolute -right-6 top-0 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 p-1">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <EditableElement value={vol.position} onChange={(val) => {
                                            const newVol = [...volunteer];
                                            newVol[index].position = val;
                                            useResumeStore.setState({ resumeData: { ...resumeData, volunteer: newVol } });
                                        }} tagName="h3" className="font-bold text-gray-900" placeholder="Role" />
                                        <div className="flex gap-1 text-sm text-gray-500 whitespace-nowrap">
                                            <EditableElement value={vol.startDate || ""} onChange={(val) => {
                                                const newVol = [...volunteer];
                                                newVol[index].startDate = val;
                                                useResumeStore.setState({ resumeData: { ...resumeData, volunteer: newVol } });
                                            }} placeholder="Start" />
                                            <span>–</span>
                                            <EditableElement value={vol.endDate || ""} onChange={(val) => {
                                                const newVol = [...volunteer];
                                                newVol[index].endDate = val;
                                                useResumeStore.setState({ resumeData: { ...resumeData, volunteer: newVol } });
                                            }} placeholder="End" />
                                        </div>
                                    </div>
                                    <div className="text-blue-600 font-medium text-sm mb-2">
                                        <EditableElement value={vol.organization} onChange={(val) => {
                                            const newVol = [...volunteer];
                                            newVol[index].organization = val;
                                            useResumeStore.setState({ resumeData: { ...resumeData, volunteer: newVol } });
                                        }} placeholder="Organization" />
                                    </div>
                                    <EditableElement value={vol.summary || ""} onChange={(val) => {
                                        const newVol = [...volunteer];
                                        newVol[index].summary = val;
                                        useResumeStore.setState({ resumeData: { ...resumeData, volunteer: newVol } });
                                    }} multiline className="text-sm text-gray-700 whitespace-pre-line w-full" placeholder="Description..." />
                                </div>
                            ))}
                        </div>
                    </section>
                );

            default:
                return null;
        }
    };

    return (
        <div style={fontStyle} className={`bg-white min-h-[297mm] p-12 shadow-lg max-w-[210mm] mx-auto`}>
            {/* Header and Summary are static for now, but could be dynamic too */}
            <header className="mb-6 group relative">
                <div className="mb-2">
                    <EditableElement
                        value={basics.name || ""}
                        onChange={(val) => updateBasics("name", val)}
                        placeholder="Your Name"
                        tagName="h1"
                        className={`text-4xl font-bold text-${primaryColor}`}
                    />
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                        <Mail className="w-4 h-4" />
                        <EditableElement value={basics.email || ""} onChange={(val) => updateBasics("email", val)} placeholder="Email" />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Phone className="w-4 h-4" />
                        <EditableElement value={basics.phone || ""} onChange={(val) => updateBasics("phone", val)} placeholder="Phone" />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        <EditableElement value={basics.location?.city || ""} onChange={(val) => updateBasics("location", { ...basics.location, city: val })} placeholder="City" />
                        <span>,</span>
                        <EditableElement value={basics.location?.region || ""} onChange={(val) => updateBasics("location", { ...basics.location, region: val })} placeholder="Region" />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Globe className="w-4 h-4" />
                        <EditableElement value={basics.url || ""} onChange={(val) => updateBasics("url", val)} placeholder="Website" />
                    </div>
                </div>
            </header>

            <section className="mb-6 group relative">
                <h2 className={`text-xl font-bold text-${primaryColor} border-b-2 border-${accentColor} pb-2 mb-3`}>
                    Professional Summary
                </h2>
                <EditableElement
                    value={basics.summary || ""}
                    onChange={(val) => updateBasics("summary", val)}
                    placeholder="Write a professional summary..."
                    multiline
                    className="text-gray-700 leading-relaxed w-full"
                />
            </section>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={activeSections}
                    strategy={verticalListSortingStrategy}
                >
                    {activeSections.map((sectionId) => (
                        <SortableSection key={sectionId} id={sectionId}>
                            {renderSection(sectionId)}
                        </SortableSection>
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
}
