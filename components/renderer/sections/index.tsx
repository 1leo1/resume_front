import React from 'react';
import { EditableText } from './EditableText';
import { Plus, Trash2 } from 'lucide-react';

export const HeaderSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleChange = (field: string, value: string) => {
        onContentChange({ ...data, [field]: value });
    };

    const handleLocationChange = (city: string) => {
        onContentChange({ ...data, location: { ...data.location, city } });
    };

    return (
        <div style={{ marginBottom: styles?.spacing?.section || '1.5rem' }}>
            <EditableText
                value={data?.name}
                onChange={(val) => handleChange('name', val)}
                isEditable={isEditable}
                tagName="h1"
                placeholder="Your Name"
                style={{ color: styles?.colors?.primary, fontFamily: styles?.fontFamily?.header, fontSize: '2rem', fontWeight: 'bold' }}
            />
            <EditableText
                value={data?.label}
                onChange={(val) => handleChange('label', val)}
                isEditable={isEditable}
                tagName="p"
                placeholder="Professional Title"
                style={{ color: styles?.colors?.text }}
            />
            <div style={{ fontSize: '0.9rem', color: styles?.colors?.text, marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <EditableText
                    value={data?.email}
                    onChange={(val) => handleChange('email', val)}
                    isEditable={isEditable}
                    placeholder="email@example.com"
                />
                <span>|</span>
                <EditableText
                    value={data?.phone}
                    onChange={(val) => handleChange('phone', val)}
                    isEditable={isEditable}
                    placeholder="Phone"
                />
                <span>|</span>
                <EditableText
                    value={data?.location?.city}
                    onChange={handleLocationChange}
                    isEditable={isEditable}
                    placeholder="City, Country"
                />
            </div>
        </div>
    );
};

export const SummarySection = ({ data, styles, isEditable, onContentChange }: any) => (
    <div style={{ marginBottom: styles?.spacing?.section || '1.5rem' }}>
        <h3 style={{
            color: styles?.colors?.primary,
            fontFamily: styles?.fontFamily?.header,
            borderBottom: `2px solid ${styles?.colors?.accent || '#eee'}`,
            paddingBottom: '0.5rem',
            marginBottom: '0.5rem'
        }}>
            Professional Summary
        </h3>
        <EditableText
            value={data}
            onChange={(val) => onContentChange(val)}
            isEditable={isEditable}
            tagName="p"
            placeholder="Write a professional summary..."
            style={{ color: styles?.colors?.text, lineHeight: '1.5' }}
        />
    </div>
);

export const ContactSection = ({ data, styles, isEditable, onContentChange }: any) => {
    // Contact is usually an object or array of strings. Let's assume array of strings for generic contact section
    const handleContactChange = (index: number, value: string) => {
        const newData = [...(Array.isArray(data) ? data : [])];
        newData[index] = value;
        onContentChange(newData);
    };

    return (
        <div style={{ marginBottom: styles?.spacing?.section || '1.5rem' }}>
            <h3 style={{
                color: styles?.colors?.primary,
                fontFamily: styles?.fontFamily?.header,
                borderBottom: `2px solid ${styles?.colors?.accent || '#eee'}`,
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
            }}>
                Contact
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {Array.isArray(data) && data.map((item: string, index: number) => (
                    <EditableText
                        key={index}
                        value={item}
                        onChange={(val) => handleContactChange(index, val)}
                        isEditable={isEditable}
                        style={{ color: styles?.colors?.text }}
                        placeholder="Contact Info"
                    />
                ))}
                {/* Fallback if data is object */}
                {!Array.isArray(data) && data && Object.entries(data).map(([key, value]: any, index: number) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{key}:</span>
                        <EditableText
                            value={value}
                            onChange={(val) => onContentChange({ ...data, [key]: val })}
                            isEditable={isEditable}
                            style={{ color: styles?.colors?.text }}
                        />
                    </div>
                ))}
            </div>
            {isEditable && (
                <button
                    onClick={() => {
                        if (Array.isArray(data)) {
                            onContentChange([...data, '']);
                        } else {
                            onContentChange(data ? [...(Array.isArray(data) ? data : []), ''] : ['']);
                        }
                    }}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm mt-2 px-2 py-1 hover:bg-blue-50 rounded transition-colors"
                >
                    <Plus size={16} /> Add Contact Info
                </button>
            )}
        </div>
    );
};

export const LanguagesSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleLanguageChange = (index: number, field: string, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onContentChange(newData);
    };

    return (
        <div style={{ marginBottom: styles?.spacing?.section || '1.5rem' }}>
            <h3 style={{
                color: styles?.colors?.primary,
                fontFamily: styles?.fontFamily?.header,
                borderBottom: `2px solid ${styles?.colors?.accent || '#eee'}`,
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
            }}>
                Languages
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {data?.map((lang: any, index: number) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <EditableText
                            value={lang.language}
                            onChange={(val) => handleLanguageChange(index, 'language', val)}
                            isEditable={isEditable}
                            style={{ fontWeight: 'bold', color: styles?.colors?.text }}
                            placeholder="Language"
                        />
                        <span style={{ color: styles?.colors?.text, opacity: 0.7 }}>-</span>
                        <EditableText
                            value={lang.fluency}
                            onChange={(val) => handleLanguageChange(index, 'fluency', val)}
                            isEditable={isEditable}
                            style={{ fontStyle: 'italic', color: styles?.colors?.text }}
                            placeholder="Fluency"
                        />
                    </div>
                ))}
            </div>
            {isEditable && (
                <button
                    onClick={() => onContentChange([...(data || []), { language: '', fluency: '' }])}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm mt-2 px-2 py-1 hover:bg-blue-50 rounded transition-colors"
                >
                    <Plus size={16} /> Add Language
                </button>
            )}
        </div>
    );
};

export const AwardsSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleAwardChange = (index: number, field: string, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onContentChange(newData);
    };

    return (
        <div style={{ marginBottom: styles?.spacing?.section || '1.5rem' }}>
            <h3 style={{
                color: styles?.colors?.primary,
                fontFamily: styles?.fontFamily?.header,
                borderBottom: `2px solid ${styles?.colors?.accent || '#eee'}`,
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
            }}>
                Awards
            </h3>
            {data?.map((award: any, index: number) => (
                <div key={index} style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                        <EditableText
                            value={award.title}
                            onChange={(val) => handleAwardChange(index, 'title', val)}
                            isEditable={isEditable}
                            style={{ color: styles?.colors?.text }}
                            placeholder="Award Title"
                        />
                        <EditableText
                            value={award.date}
                            onChange={(val) => handleAwardChange(index, 'date', val)}
                            isEditable={isEditable}
                            style={{ color: styles?.colors?.text }}
                            placeholder="Date"
                        />
                    </div>
                    <EditableText
                        value={award.awarder}
                        onChange={(val) => handleAwardChange(index, 'awarder', val)}
                        isEditable={isEditable}
                        style={{ color: styles?.colors?.primary, fontStyle: 'italic', fontSize: '0.9rem' }}
                        placeholder="Awarder"
                    />
                    <EditableText
                        value={award.summary}
                        onChange={(val) => handleAwardChange(index, 'summary', val)}
                        isEditable={isEditable}
                        tagName="p"
                        style={{ fontSize: '0.9rem', color: styles?.colors?.text }}
                        placeholder="Summary..."
                    />
                </div>
            ))}
            {isEditable && (
                <button
                    onClick={() => onContentChange([...(data || []), { title: '', date: '', awarder: '', summary: '' }])}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm mt-2 px-2 py-1 hover:bg-blue-50 rounded transition-colors"
                >
                    <Plus size={16} /> Add Award
                </button>
            )}
        </div>
    );
};

export const VolunteerSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleVolChange = (index: number, field: string, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onContentChange(newData);
    };

    return (
        <div style={{ marginBottom: styles?.spacing?.section || '1.5rem' }}>
            <h3 style={{
                color: styles?.colors?.primary,
                fontFamily: styles?.fontFamily?.header,
                borderBottom: `2px solid ${styles?.colors?.accent || '#eee'}`,
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
            }}>
                Volunteering
            </h3>
            {data?.map((vol: any, index: number) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                        <EditableText
                            value={vol.organization}
                            onChange={(val) => handleVolChange(index, 'organization', val)}
                            isEditable={isEditable}
                            style={{ color: styles?.colors?.text }}
                            placeholder="Organization"
                        />
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                            <EditableText
                                value={vol.startDate}
                                onChange={(val) => handleVolChange(index, 'startDate', val)}
                                isEditable={isEditable}
                                style={{ color: styles?.colors?.text }}
                                placeholder="Start"
                            />
                            <span>-</span>
                            <EditableText
                                value={vol.endDate}
                                onChange={(val) => handleVolChange(index, 'endDate', val)}
                                isEditable={isEditable}
                                style={{ color: styles?.colors?.text }}
                                placeholder="End"
                            />
                        </div>
                    </div>
                    <EditableText
                        value={vol.position}
                        onChange={(val) => handleVolChange(index, 'position', val)}
                        isEditable={isEditable}
                        style={{ color: styles?.colors?.primary, fontStyle: 'italic', marginBottom: '0.25rem', display: 'block' }}
                        placeholder="Position"
                    />
                    <EditableText
                        value={vol.summary}
                        onChange={(val) => handleVolChange(index, 'summary', val)}
                        isEditable={isEditable}
                        tagName="p"
                        style={{ fontSize: '0.9rem', color: styles?.colors?.text }}
                        placeholder="Summary..."
                    />
                </div>
            ))}
            {isEditable && (
                <button
                    onClick={() => onContentChange([...(data || []), { organization: '', position: '', startDate: '', endDate: '', summary: '' }])}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm mt-2 px-2 py-1 hover:bg-blue-50 rounded transition-colors"
                >
                    <Plus size={16} /> Add Volunteer Work
                </button>
            )}
        </div>
    );
};

export const ReferencesSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleRefChange = (index: number, field: string, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onContentChange(newData);
    };

    return (
        <div style={{ marginBottom: styles?.spacing?.section || '1.5rem' }}>
            <h3 style={{
                color: styles?.colors?.primary,
                fontFamily: styles?.fontFamily?.header,
                borderBottom: `2px solid ${styles?.colors?.accent || '#eee'}`,
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
            }}>
                References
            </h3>
            {data?.map((ref: any, index: number) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                    <EditableText
                        value={ref.name}
                        onChange={(val) => handleRefChange(index, 'name', val)}
                        isEditable={isEditable}
                        style={{ fontWeight: 'bold', color: styles?.colors?.text, display: 'block' }}
                        placeholder="Reference Name"
                    />
                    <EditableText
                        value={ref.reference}
                        onChange={(val) => handleRefChange(index, 'reference', val)}
                        isEditable={isEditable}
                        tagName="p"
                        style={{ fontSize: '0.9rem', color: styles?.colors?.text, fontStyle: 'italic' }}
                        placeholder="Reference..."
                    />
                </div>
            ))}
            {isEditable && (
                <button
                    onClick={() => onContentChange([...(data || []), { name: '', reference: '' }])}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm mt-2 px-2 py-1 hover:bg-blue-50 rounded transition-colors"
                >
                    <Plus size={16} /> Add Reference
                </button>
            )}
        </div>
    );
};

export const WorkSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleJobChange = (index: number, field: string, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onContentChange(newData);
    };

    return (
        <div style={{ marginBottom: styles?.spacing?.section || '1.5rem' }}>
            <h3 style={{
                color: styles?.colors?.primary,
                fontFamily: styles?.fontFamily?.header,
                borderBottom: `2px solid ${styles?.colors?.accent || '#eee'}`,
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
            }}>
                Experience
            </h3>
            {data?.map((job: any, index: number) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                        <EditableText
                            value={job.position}
                            onChange={(val) => handleJobChange(index, 'position', val)}
                            isEditable={isEditable}
                            style={{ color: styles?.colors?.text }}
                            placeholder="Position"
                        />
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                            <EditableText
                                value={job.startDate}
                                onChange={(val) => handleJobChange(index, 'startDate', val)}
                                isEditable={isEditable}
                                style={{ color: styles?.colors?.text }}
                                placeholder="Start"
                            />
                            <span>-</span>
                            <EditableText
                                value={job.endDate}
                                onChange={(val) => handleJobChange(index, 'endDate', val)}
                                isEditable={isEditable}
                                style={{ color: styles?.colors?.text }}
                                placeholder="End"
                            />
                        </div>
                    </div>
                    <EditableText
                        value={job.name}
                        onChange={(val) => handleJobChange(index, 'name', val)}
                        isEditable={isEditable}
                        style={{ color: styles?.colors?.primary, fontStyle: 'italic', marginBottom: '0.25rem', display: 'block' }}
                        placeholder="Company Name"
                    />
                    <EditableText
                        value={job.summary}
                        onChange={(val) => handleJobChange(index, 'summary', val)}
                        isEditable={isEditable}
                        tagName="p"
                        style={{ fontSize: '0.9rem', color: styles?.colors?.text }}
                        placeholder="Job Summary..."
                    />
                    {/* Highlights editing could be complex, skipping for now or treating as list */}
                </div>
            ))}
            {isEditable && (
                <button
                    onClick={() => onContentChange([...(data || []), { name: '', position: '', startDate: '', endDate: '', summary: '' }])}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm mt-2 px-2 py-1 hover:bg-blue-50 rounded transition-colors"
                >
                    <Plus size={16} /> Add Position
                </button>
            )}
        </div>
    );
};

export const EducationSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleEduChange = (index: number, field: string, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onContentChange(newData);
    };

    return (
        <div style={{ marginBottom: styles?.spacing?.section || '1.5rem' }}>
            <h3 style={{
                color: styles?.colors?.primary,
                fontFamily: styles?.fontFamily?.header,
                borderBottom: `2px solid ${styles?.colors?.accent || '#eee'}`,
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
            }}>
                Education
            </h3>
            {data?.map((edu: any, index: number) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                        <EditableText
                            value={edu.institution}
                            onChange={(val) => handleEduChange(index, 'institution', val)}
                            isEditable={isEditable}
                            style={{ color: styles?.colors?.text }}
                            placeholder="Institution"
                        />
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                            <EditableText
                                value={edu.startDate}
                                onChange={(val) => handleEduChange(index, 'startDate', val)}
                                isEditable={isEditable}
                                style={{ color: styles?.colors?.text }}
                                placeholder="Start"
                            />
                            <span>-</span>
                            <EditableText
                                value={edu.endDate}
                                onChange={(val) => handleEduChange(index, 'endDate', val)}
                                isEditable={isEditable}
                                style={{ color: styles?.colors?.text }}
                                placeholder="End"
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <EditableText
                            value={edu.studyType}
                            onChange={(val) => handleEduChange(index, 'studyType', val)}
                            isEditable={isEditable}
                            placeholder="Degree"
                        />
                        <span>in</span>
                        <EditableText
                            value={edu.area}
                            onChange={(val) => handleEduChange(index, 'area', val)}
                            isEditable={isEditable}
                            placeholder="Field of Study"
                        />
                    </div>
                </div>
            ))}
            {isEditable && (
                <button
                    onClick={() => onContentChange([...(data || []), { institution: '', area: '', studyType: '', startDate: '', endDate: '' }])}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm mt-2 px-2 py-1 hover:bg-blue-50 rounded transition-colors"
                >
                    <Plus size={16} /> Add Education
                </button>
            )}
        </div>
    );
};

export const SkillsSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleSkillChange = (index: number, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], name: value };
        onContentChange(newData);
    };

    return (
        <div style={{ marginBottom: styles?.spacing?.section || '1.5rem' }}>
            <h3 style={{
                color: styles?.colors?.primary,
                fontFamily: styles?.fontFamily?.header,
                borderBottom: `2px solid ${styles?.colors?.accent || '#eee'}`,
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
            }}>
                Skills
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {data?.map((skill: any, index: number) => (
                    <div key={index} style={{
                        backgroundColor: styles?.colors?.accent || '#f3f4f6',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        color: styles?.colors?.text
                    }}>
                        <EditableText
                            value={skill.name}
                            onChange={(val) => handleSkillChange(index, val)}
                            isEditable={isEditable}
                            placeholder="Skill"
                        />
                    </div>
                ))}
                {isEditable && (
                    <button
                        onClick={() => onContentChange([...(data || []), { name: 'New Skill' }])}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm px-2 py-1 hover:bg-blue-50 rounded transition-colors"
                    >
                        <Plus size={14} /> Add
                    </button>
                )}
            </div>
        </div>
    );
};

export const ProjectsSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleProjectChange = (index: number, field: string, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onContentChange(newData);
    };

    return (
        <div style={{ marginBottom: styles?.spacing?.section || '1.5rem' }}>
            <h3 style={{
                color: styles?.colors?.primary,
                fontFamily: styles?.fontFamily?.header,
                borderBottom: `2px solid ${styles?.colors?.accent || '#eee'}`,
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
            }}>
                Projects
            </h3>
            {data?.map((project: any, index: number) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                    <EditableText
                        value={project.name}
                        onChange={(val) => handleProjectChange(index, 'name', val)}
                        isEditable={isEditable}
                        style={{ fontWeight: 'bold', color: styles?.colors?.text, display: 'block' }}
                        placeholder="Project Name"
                    />
                    <EditableText
                        value={project.description}
                        onChange={(val) => handleProjectChange(index, 'description', val)}
                        isEditable={isEditable}
                        tagName="p"
                        style={{ fontSize: '0.9rem', color: styles?.colors?.text }}
                        placeholder="Project Description..."
                    />
                    {/* Highlights skipped for now */}
                </div>
            ))}
            {isEditable && (
                <button
                    onClick={() => onContentChange([...(data || []), { name: '', description: '' }])}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm mt-2 px-2 py-1 hover:bg-blue-50 rounded transition-colors"
                >
                    <Plus size={16} /> Add Project
                </button>
            )}
        </div>
    );
};
