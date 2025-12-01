import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { X } from 'lucide-react';

interface EditSectionDrawerProps {
    sectionId: string;
    onClose: () => void;
}

export default function EditSectionDrawer({ sectionId, onClose }: EditSectionDrawerProps) {
    const { resumeData, updateBasics } = useResumeStore();

    // We'll add more forms here later
    const renderForm = () => {
        switch (sectionId) {
            case 'header':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input
                                type="text"
                                value={resumeData.basics.name}
                                onChange={(e) => updateBasics('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                value={resumeData.basics.email}
                                onChange={(e) => updateBasics('email', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                            <input
                                type="text"
                                value={resumeData.basics.phone}
                                onChange={(e) => updateBasics('phone', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Professional Title</label>
                            <input
                                type="text"
                                value={resumeData.basics.label}
                                onChange={(e) => updateBasics('label', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                            <input
                                type="text"
                                value={resumeData.basics.location?.city || ''}
                                onChange={(e) => updateBasics('location', { ...resumeData.basics.location, city: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                            />
                        </div>
                    </div>
                );
            case 'summary':
                return (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Professional Summary</label>
                        <textarea
                            rows={6}
                            value={resumeData.basics.summary}
                            onChange={(e) => updateBasics('summary', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                        />
                    </div>
                );
            case 'work':
                return (
                    <div className="space-y-6">
                        {resumeData.work.map((job, index) => (
                            <div key={index} className="p-4 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase">Company</label>
                                        <input
                                            type="text"
                                            value={job.name}
                                            onChange={(e) => {
                                                const newWork = [...resumeData.work];
                                                newWork[index].name = e.target.value;
                                                useResumeStore.getState().setResumeData({ ...resumeData, work: newWork });
                                            }}
                                            className="mt-1 block w-full rounded border-gray-300 text-sm dark:bg-gray-800 dark:border-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase">Position</label>
                                        <input
                                            type="text"
                                            value={job.position}
                                            onChange={(e) => {
                                                const newWork = [...resumeData.work];
                                                newWork[index].position = e.target.value;
                                                useResumeStore.getState().setResumeData({ ...resumeData, work: newWork });
                                            }}
                                            className="mt-1 block w-full rounded border-gray-300 text-sm dark:bg-gray-800 dark:border-gray-700"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-xs font-medium text-gray-500 uppercase">Summary</label>
                                    <textarea
                                        rows={3}
                                        value={job.summary}
                                        onChange={(e) => {
                                            const newWork = [...resumeData.work];
                                            newWork[index].summary = e.target.value;
                                            useResumeStore.getState().setResumeData({ ...resumeData, work: newWork });
                                        }}
                                        className="mt-1 block w-full rounded border-gray-300 text-sm dark:bg-gray-800 dark:border-gray-700"
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => useResumeStore.getState().addWork({ name: 'New Company', position: 'Role', startDate: '', endDate: '', summary: '', highlights: [] })}
                            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                        >
                            + Add Position
                        </button>
                    </div>
                );
            case 'education':
                return (
                    <div className="space-y-6">
                        {resumeData.education.map((edu, index) => (
                            <div key={index} className="p-4 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                <div className="mb-4">
                                    <label className="block text-xs font-medium text-gray-500 uppercase">Institution</label>
                                    <input
                                        type="text"
                                        value={edu.institution}
                                        onChange={(e) => {
                                            const newEdu = [...resumeData.education];
                                            newEdu[index].institution = e.target.value;
                                            useResumeStore.getState().setResumeData({ ...resumeData, education: newEdu });
                                        }}
                                        className="mt-1 block w-full rounded border-gray-300 text-sm dark:bg-gray-800 dark:border-gray-700"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase">Degree</label>
                                        <input
                                            type="text"
                                            value={edu.studyType}
                                            onChange={(e) => {
                                                const newEdu = [...resumeData.education];
                                                newEdu[index].studyType = e.target.value;
                                                useResumeStore.getState().setResumeData({ ...resumeData, education: newEdu });
                                            }}
                                            className="mt-1 block w-full rounded border-gray-300 text-sm dark:bg-gray-800 dark:border-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase">Field of Study</label>
                                        <input
                                            type="text"
                                            value={edu.area}
                                            onChange={(e) => {
                                                const newEdu = [...resumeData.education];
                                                newEdu[index].area = e.target.value;
                                                useResumeStore.getState().setResumeData({ ...resumeData, education: newEdu });
                                            }}
                                            className="mt-1 block w-full rounded border-gray-300 text-sm dark:bg-gray-800 dark:border-gray-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => useResumeStore.getState().addEducation({ institution: 'University', area: 'Major', studyType: 'Degree', startDate: '', endDate: '', score: '', courses: [] })}
                            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                        >
                            + Add Education
                        </button>
                    </div>
                );
            case 'skills':
                return (
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {resumeData.skills.map((skill, index) => (
                                <div key={index} className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
                                    <input
                                        type="text"
                                        value={skill.name}
                                        onChange={(e) => {
                                            const newSkills = [...resumeData.skills];
                                            newSkills[index].name = e.target.value;
                                            useResumeStore.getState().setResumeData({ ...resumeData, skills: newSkills });
                                        }}
                                        className="bg-transparent border-none focus:ring-0 text-sm w-24"
                                    />
                                    <button
                                        onClick={() => {
                                            const newSkills = resumeData.skills.filter((_, i) => i !== index);
                                            useResumeStore.getState().setResumeData({ ...resumeData, skills: newSkills });
                                        }}
                                        className="ml-2 text-gray-400 hover:text-red-500"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => useResumeStore.getState().addSkill('New Skill')}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            + Add Skill
                        </button>
                    </div>
                );
            case 'projects':
                return (
                    <div className="space-y-6">
                        {resumeData.projects.map((project, index) => (
                            <div key={index} className="p-4 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                <div className="mb-4">
                                    <label className="block text-xs font-medium text-gray-500 uppercase">Project Name</label>
                                    <input
                                        type="text"
                                        value={project.name}
                                        onChange={(e) => {
                                            const newProjects = [...resumeData.projects];
                                            newProjects[index].name = e.target.value;
                                            useResumeStore.getState().setResumeData({ ...resumeData, projects: newProjects });
                                        }}
                                        className="mt-1 block w-full rounded border-gray-300 text-sm dark:bg-gray-800 dark:border-gray-700"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-xs font-medium text-gray-500 uppercase">Description</label>
                                    <textarea
                                        rows={3}
                                        value={project.description}
                                        onChange={(e) => {
                                            const newProjects = [...resumeData.projects];
                                            newProjects[index].description = e.target.value;
                                            useResumeStore.getState().setResumeData({ ...resumeData, projects: newProjects });
                                        }}
                                        className="mt-1 block w-full rounded border-gray-300 text-sm dark:bg-gray-800 dark:border-gray-700"
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => useResumeStore.getState().addProject({ name: 'New Project', description: '', highlights: [], keywords: [], url: '' })}
                            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                        >
                            + Add Project
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b flex items-center justify-between dark:border-gray-800 shrink-0">
                <h3 className="font-bold text-lg capitalize">Edit {sectionId}</h3>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors dark:hover:bg-gray-800">
                    <X className="w-5 h-5" />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {renderForm()}
            </div>
        </div>
    );
}
