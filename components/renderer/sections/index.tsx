import React from 'react';
import { EditableText } from './EditableText';
import { Plus, Trash2, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

const SectionTitle = ({ title, color, children }: { title: string; color?: string; children?: React.ReactNode }) => (
    <div className="flex items-center justify-between mb-4">
        <h3
            className="text-base font-semibold tracking-wide uppercase"
            style={{ color: color || '#2563eb' }}
        >
            {title}
        </h3>
        {children}
    </div>
);

const ActionButton = ({ onClick, children, variant = 'add' }: { onClick: () => void; children: React.ReactNode; variant?: 'add' | 'delete' }) => (
    <button
        onClick={onClick}
        className={`
            flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-all mt-3
            ${variant === 'add'
                ? 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                : 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100'
            }
        `}
    >
        {children}
    </button>
);

const DeleteButton = ({ onClick, className = "" }: { onClick: () => void; className?: string }) => (
    <button
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}
        className={`flex-shrink-0 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100 transition-all ${className}`}
        title="Remove"
    >
        <Trash2 size={14} />
    </button>
);

export const HeaderSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleChange = (field: string, value: string) => {
        onContentChange({ ...data, [field]: value });
    };

    const handleLocationChange = (city: string) => {
        onContentChange({ ...data, location: { ...data?.location, city } });
    };

    return (
        <div className="mb-6 pb-6 border-b-2" style={{ borderColor: styles?.colors?.primary || '#2563eb' }}>
            <EditableText
                value={data?.name}
                onChange={(val) => handleChange('name', val)}
                isEditable={isEditable}
                tagName="h1"
                placeholder="Your Full Name"
                minWidth="240px"
                minHeight="48px"
                style={{
                    color: styles?.colors?.primary || '#1f2937',
                    fontFamily: styles?.fontFamily?.header,
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    letterSpacing: '-0.025em',
                    lineHeight: '1.2'
                }}
            />
            <EditableText
                value={data?.label}
                onChange={(val) => handleChange('label', val)}
                isEditable={isEditable}
                tagName="p"
                placeholder="Professional Title"
                minWidth="200px"
                minHeight="28px"
                style={{
                    color: '#6b7280',
                    fontSize: '1.125rem',
                    marginTop: '0.25rem'
                }}
            />
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                {(data?.email || isEditable) && (
                    <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        <EditableText
                            value={data?.email}
                            onChange={(val) => handleChange('email', val)}
                            isEditable={isEditable}
                            placeholder="email@example.com"
                        />
                    </div>
                )}
                {(data?.phone || isEditable) && (
                    <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <EditableText
                            value={data?.phone}
                            onChange={(val) => handleChange('phone', val)}
                            isEditable={isEditable}
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>
                )}
                {(data?.location?.city || isEditable) && (
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <EditableText
                            value={data?.location?.city}
                            onChange={handleLocationChange}
                            isEditable={isEditable}
                            placeholder="City, Country"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export const SummarySection = ({ data, styles, isEditable, onContentChange }: any) => (
    <div className="mb-6">
        <SectionTitle title="Professional Summary" color={styles?.colors?.primary} />
        <EditableText
            value={typeof data === 'string' ? data : data?.summary}
            onChange={(val) => onContentChange(val)}
            isEditable={isEditable}
            tagName="p"
            placeholder="Write a compelling professional summary that highlights your key achievements and career objectives..."
            multiline
            style={{
                color: '#374151',
                lineHeight: '1.7',
                fontSize: '0.9rem'
            }}
        />
    </div>
);

export const ContactSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleContactChange = (index: number, value: string) => {
        const newData = [...(Array.isArray(data) ? data : [])];
        newData[index] = value;
        onContentChange(newData);
    };

    return (
        <div className="mb-6">
            <SectionTitle title="Contact" color={styles?.colors?.primary} />
            <div className="space-y-2">
                {Array.isArray(data) && data.map((item: string, index: number) => (
                    <div key={index} className="group flex items-center gap-2">
                        <EditableText
                            value={item}
                            onChange={(val) => handleContactChange(index, val)}
                            isEditable={isEditable}
                            style={{ color: '#374151', fontSize: '0.9rem' }}
                            placeholder="Contact Info"
                        />
                        {isEditable && (
                            <DeleteButton onClick={() => onContentChange(data.filter((_: any, i: number) => i !== index))} />
                        )}
                    </div>
                ))}
                {!Array.isArray(data) && data && Object.entries(data).map(([key, value]: any, index: number) => {
                    if (typeof value === 'object' && value !== null) {
                        if (key === 'location') {
                            const locStr = [value.city, value.region, value.countryCode].filter(Boolean).join(', ');
                            return (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="font-medium text-gray-500 capitalize text-sm w-20">{key}:</span>
                                    <EditableText
                                        value={locStr}
                                        onChange={(val) => {
                                            const parts = val.split(',').map((s: string) => s.trim());
                                            onContentChange({ ...data, location: { ...value, city: parts[0], region: parts[1] } });
                                        }}
                                        isEditable={isEditable}
                                        style={{ color: '#374151', fontSize: '0.9rem' }}
                                    />
                                </div>
                            );
                        }
                        return null;
                    }
                    return (
                        <div key={index} className="flex items-center gap-2">
                            <span className="font-medium text-gray-500 capitalize text-sm w-20">{key}:</span>
                            <EditableText
                                value={value}
                                onChange={(val) => onContentChange({ ...data, [key]: val })}
                                isEditable={isEditable}
                                style={{ color: '#374151', fontSize: '0.9rem' }}
                            />
                        </div>
                    );
                })}
            </div>
            {isEditable && (
                <ActionButton onClick={() => {
                    if (Array.isArray(data)) {
                        onContentChange([...data, '']);
                    } else {
                        onContentChange(data ? [...(Array.isArray(data) ? data : []), ''] : ['']);
                    }
                }}>
                    <Plus size={16} /> Add Contact
                </ActionButton>
            )}
        </div>
    );
};

export const LanguagesSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleLanguageChange = (index: number, field: string, value: string) => {
        const newData = [...(data || [])];
        newData[index] = { ...newData[index], [field]: value };
        onContentChange(newData);
    };

    return (
        <div className="mb-6">
            <SectionTitle title="Languages" color={styles?.colors?.primary} />
            <div className="flex flex-wrap gap-2">
                {data?.map((lang: any, index: number) => (
                    <div
                        key={index}
                        className="group flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                        <EditableText
                            value={lang.language}
                            onChange={(val) => handleLanguageChange(index, 'language', val)}
                            isEditable={isEditable}
                            style={{ fontWeight: 500, color: '#374151', fontSize: '0.875rem' }}
                            placeholder="Language"
                        />
                        <span className="text-gray-300">•</span>
                        <EditableText
                            value={lang.fluency}
                            onChange={(val) => handleLanguageChange(index, 'fluency', val)}
                            isEditable={isEditable}
                            style={{ color: '#6b7280', fontSize: '0.875rem' }}
                            placeholder="Level"
                        />
                        {isEditable && (
                            <DeleteButton onClick={() => onContentChange(data.filter((_: any, i: number) => i !== index))} />
                        )}
                    </div>
                ))}
            </div>
            {isEditable && (
                <ActionButton onClick={() => onContentChange([...(data || []), { language: '', fluency: '' }])}>
                    <Plus size={16} /> Add Language
                </ActionButton>
            )}
        </div>
    );
};

export const AwardsSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleAwardChange = (index: number, field: string, value: string) => {
        const newData = [...(data || [])];
        newData[index] = { ...newData[index], [field]: value };
        onContentChange(newData);
    };

    return (
        <div className="mb-6">
            <SectionTitle title="Awards & Achievements" color={styles?.colors?.primary} />
            <div className="space-y-4">
                {data?.map((award: any, index: number) => (
                    <div key={index} className="group pl-4 border-l-2 border-gray-200 hover:border-blue-400 transition-colors">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <EditableText
                                    value={award.title}
                                    onChange={(val) => handleAwardChange(index, 'title', val)}
                                    isEditable={isEditable}
                                    style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.95rem' }}
                                    placeholder="Award Title"
                                />
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <EditableText
                                    value={award.date}
                                    onChange={(val) => handleAwardChange(index, 'date', val)}
                                    isEditable={isEditable}
                                    style={{ color: '#6b7280', fontSize: '0.85rem' }}
                                    placeholder="Year"
                                />
                                {isEditable && (
                                    <DeleteButton onClick={() => onContentChange(data.filter((_: any, i: number) => i !== index))} />
                                )}
                            </div>
                        </div>
                        <EditableText
                            value={award.awarder}
                            onChange={(val) => handleAwardChange(index, 'awarder', val)}
                            isEditable={isEditable}
                            style={{ color: styles?.colors?.primary, fontSize: '0.875rem' }}
                            placeholder="Issuing Organization"
                        />
                        {(award.summary || isEditable) && (
                            <EditableText
                                value={award.summary}
                                onChange={(val) => handleAwardChange(index, 'summary', val)}
                                isEditable={isEditable}
                                tagName="p"
                                multiline
                                style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '0.25rem' }}
                                placeholder="Brief description..."
                            />
                        )}
                    </div>
                ))}
            </div>
            {isEditable && (
                <ActionButton onClick={() => onContentChange([...(data || []), { title: '', date: '', awarder: '', summary: '' }])}>
                    <Plus size={16} /> Add Award
                </ActionButton>
            )}
        </div>
    );
};

export const VolunteerSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleVolChange = (index: number, field: string, value: string) => {
        const newData = [...(data || [])];
        newData[index] = { ...newData[index], [field]: value };
        onContentChange(newData);
    };

    return (
        <div className="mb-6">
            <SectionTitle title="Volunteer Experience" color={styles?.colors?.primary} />
            <div className="space-y-4">
                {data?.map((vol: any, index: number) => (
                    <div key={index} className="group">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <EditableText
                                    value={vol.position}
                                    onChange={(val) => handleVolChange(index, 'position', val)}
                                    isEditable={isEditable}
                                    style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.95rem' }}
                                    placeholder="Role/Position"
                                />
                                <EditableText
                                    value={vol.organization}
                                    onChange={(val) => handleVolChange(index, 'organization', val)}
                                    isEditable={isEditable}
                                    style={{ color: styles?.colors?.primary, fontSize: '0.875rem' }}
                                    placeholder="Organization Name"
                                />
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <div className="text-sm text-gray-500">
                                    <EditableText
                                        value={vol.startDate}
                                        onChange={(val) => handleVolChange(index, 'startDate', val)}
                                        isEditable={isEditable}
                                        placeholder="Start"
                                    />
                                    <span className="mx-1">-</span>
                                    <EditableText
                                        value={vol.endDate}
                                        onChange={(val) => handleVolChange(index, 'endDate', val)}
                                        isEditable={isEditable}
                                        placeholder="End"
                                    />
                                </div>
                                {isEditable && (
                                    <DeleteButton onClick={() => onContentChange(data.filter((_: any, i: number) => i !== index))} />
                                )}
                            </div>
                        </div>
                        {(vol.summary || isEditable) && (
                            <EditableText
                                value={vol.summary}
                                onChange={(val) => handleVolChange(index, 'summary', val)}
                                isEditable={isEditable}
                                tagName="p"
                                multiline
                                style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '0.5rem', lineHeight: '1.6' }}
                                placeholder="Describe your contributions..."
                            />
                        )}
                    </div>
                ))}
            </div>
            {isEditable && (
                <ActionButton onClick={() => onContentChange([...(data || []), { organization: '', position: '', startDate: '', endDate: '', summary: '' }])}>
                    <Plus size={16} /> Add Volunteer Work
                </ActionButton>
            )}
        </div>
    );
};

export const ReferencesSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleRefChange = (index: number, field: string, value: string) => {
        const newData = [...(data || [])];
        newData[index] = { ...newData[index], [field]: value };
        onContentChange(newData);
    };

    return (
        <div className="mb-6">
            <SectionTitle title="References" color={styles?.colors?.primary} />
            <div className="space-y-4">
                {data?.map((ref: any, index: number) => (
                    <div key={index} className="group bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <EditableText
                                    value={ref.name}
                                    onChange={(val) => handleRefChange(index, 'name', val)}
                                    isEditable={isEditable}
                                    style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.95rem', display: 'block' }}
                                    placeholder="Reference Name"
                                />
                            </div>
                            {isEditable && (
                                <DeleteButton onClick={() => onContentChange(data.filter((_: any, i: number) => i !== index))} />
                            )}
                        </div>
                        <EditableText
                            value={ref.reference}
                            onChange={(val) => handleRefChange(index, 'reference', val)}
                            isEditable={isEditable}
                            tagName="p"
                            multiline
                            style={{ fontSize: '0.875rem', color: '#4b5563', fontStyle: 'italic', marginTop: '0.5rem', lineHeight: '1.6' }}
                            placeholder="Reference details or testimonial..."
                        />
                    </div>
                ))}
            </div>
            {isEditable && (
                <ActionButton onClick={() => onContentChange([...(data || []), { name: '', reference: '' }])}>
                    <Plus size={16} /> Add Reference
                </ActionButton>
            )}
        </div>
    );
};

export const WorkSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleJobChange = (index: number, field: string, value: string) => {
        const newData = [...(data || [])];
        newData[index] = { ...newData[index], [field]: value };
        onContentChange(newData);
    };

    return (
        <div className="mb-6">
            <SectionTitle title="Experience" color={styles?.colors?.primary} />
            <div className="space-y-5">
                {data?.map((job: any, index: number) => (
                    <div key={index} className="group">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <EditableText
                                    value={job.position}
                                    onChange={(val) => handleJobChange(index, 'position', val)}
                                    isEditable={isEditable}
                                    style={{ fontWeight: 600, color: '#1f2937', fontSize: '1rem' }}
                                    placeholder="Job Title"
                                />
                                <EditableText
                                    value={job.name}
                                    onChange={(val) => handleJobChange(index, 'name', val)}
                                    isEditable={isEditable}
                                    style={{ color: styles?.colors?.primary, fontSize: '0.9rem' }}
                                    placeholder="Company Name"
                                />
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <div className="text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <EditableText
                                            value={job.startDate}
                                            onChange={(val) => handleJobChange(index, 'startDate', val)}
                                            isEditable={isEditable}
                                            placeholder="Start"
                                        />
                                        <span>-</span>
                                        <EditableText
                                            value={job.endDate}
                                            onChange={(val) => handleJobChange(index, 'endDate', val)}
                                            isEditable={isEditable}
                                            placeholder="Present"
                                        />
                                    </div>
                                </div>
                                {isEditable && (
                                    <DeleteButton onClick={() => onContentChange(data.filter((_: any, i: number) => i !== index))} />
                                )}
                            </div>
                        </div>
                        <EditableText
                            value={job.summary}
                            onChange={(val) => handleJobChange(index, 'summary', val)}
                            isEditable={isEditable}
                            tagName="p"
                            multiline
                            style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '0.5rem', lineHeight: '1.7' }}
                            placeholder="Describe your key responsibilities and achievements..."
                        />
                    </div>
                ))}
            </div>
            {isEditable && (
                <ActionButton onClick={() => onContentChange([...(data || []), { name: '', position: '', startDate: '', endDate: '', summary: '' }])}>
                    <Plus size={16} /> Add Experience
                </ActionButton>
            )}
        </div>
    );
};

export const EducationSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleEduChange = (index: number, field: string, value: string) => {
        const newData = [...(data || [])];
        newData[index] = { ...newData[index], [field]: value };
        onContentChange(newData);
    };

    return (
        <div className="mb-6">
            <SectionTitle title="Education" color={styles?.colors?.primary} />
            <div className="space-y-4">
                {data?.map((edu: any, index: number) => (
                    <div key={index} className="group">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <EditableText
                                    value={edu.institution}
                                    onChange={(val) => handleEduChange(index, 'institution', val)}
                                    isEditable={isEditable}
                                    style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.95rem' }}
                                    placeholder="University/School Name"
                                />
                                <div className="flex items-center gap-1 text-gray-600 text-sm flex-wrap">
                                    <EditableText
                                        value={edu.studyType}
                                        onChange={(val) => handleEduChange(index, 'studyType', val)}
                                        isEditable={isEditable}
                                        placeholder="Degree"
                                    />
                                    {(edu.area || isEditable) && (
                                        <>
                                            <span className="text-gray-400">in</span>
                                            <EditableText
                                                value={edu.area}
                                                onChange={(val) => handleEduChange(index, 'area', val)}
                                                isEditable={isEditable}
                                                placeholder="Field of Study"
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <div className="text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <EditableText
                                            value={edu.startDate}
                                            onChange={(val) => handleEduChange(index, 'startDate', val)}
                                            isEditable={isEditable}
                                            placeholder="Start"
                                        />
                                        <span>-</span>
                                        <EditableText
                                            value={edu.endDate}
                                            onChange={(val) => handleEduChange(index, 'endDate', val)}
                                            isEditable={isEditable}
                                            placeholder="End"
                                        />
                                    </div>
                                </div>
                                {isEditable && (
                                    <DeleteButton onClick={() => onContentChange(data.filter((_: any, i: number) => i !== index))} />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {isEditable && (
                <ActionButton onClick={() => onContentChange([...(data || []), { institution: '', area: '', studyType: '', startDate: '', endDate: '' }])}>
                    <Plus size={16} /> Add Education
                </ActionButton>
            )}
        </div>
    );
};

export const SkillsSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleSkillChange = (index: number, value: string) => {
        const newData = [...(data || [])];
        newData[index] = { ...newData[index], name: value };
        onContentChange(newData);
    };

    const handleRemoveSkill = (index: number) => {
        onContentChange(data.filter((_: any, i: number) => i !== index));
    };

    return (
        <div className="mb-6">
            <SectionTitle title="Skills" color={styles?.colors?.primary} />
            <div className="flex flex-wrap gap-2">
                {data?.map((skill: any, index: number) => (
                    <div
                        key={index}
                        className="group inline-flex items-center bg-gray-100 hover:bg-gray-200 pl-3 pr-2 py-1.5 rounded-full transition-colors"
                    >
                        <EditableText
                            value={skill.name}
                            onChange={(val) => handleSkillChange(index, val)}
                            isEditable={isEditable}
                            style={{ fontSize: '0.875rem', color: '#374151', fontWeight: 500 }}
                            placeholder="Skill"
                        />
                        {isEditable && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveSkill(index);
                                }}
                                className="flex-shrink-0 ml-1 p-0.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                title="Remove skill"
                            >
                                <Trash2 size={12} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {isEditable && (
                <ActionButton onClick={() => onContentChange([...(data || []), { name: '', level: '' }])}>
                    <Plus size={16} /> Add Skill
                </ActionButton>
            )}
        </div>
    );
};

export const ProjectsSection = ({ data, styles, isEditable, onContentChange }: any) => {
    const handleProjectChange = (index: number, field: string, value: string) => {
        const newData = [...(data || [])];
        newData[index] = { ...newData[index], [field]: value };
        onContentChange(newData);
    };

    return (
        <div className="mb-6">
            <SectionTitle title="Projects" color={styles?.colors?.primary} />
            <div className="space-y-4">
                {data?.map((project: any, index: number) => (
                    <div key={index} className="group">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <EditableText
                                    value={project.name}
                                    onChange={(val) => handleProjectChange(index, 'name', val)}
                                    isEditable={isEditable}
                                    style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.95rem' }}
                                    placeholder="Project Name"
                                />
                                {(project.url || isEditable) && (
                                    <EditableText
                                        value={project.url}
                                        onChange={(val) => handleProjectChange(index, 'url', val)}
                                        isEditable={isEditable}
                                        style={{ color: styles?.colors?.primary, fontSize: '0.8rem' }}
                                        placeholder="Project URL"
                                    />
                                )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                {(project.startDate || project.endDate || isEditable) && (
                                    <div className="text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <EditableText
                                                value={project.startDate}
                                                onChange={(val) => handleProjectChange(index, 'startDate', val)}
                                                isEditable={isEditable}
                                                placeholder="Start"
                                            />
                                            <span>-</span>
                                            <EditableText
                                                value={project.endDate}
                                                onChange={(val) => handleProjectChange(index, 'endDate', val)}
                                                isEditable={isEditable}
                                                placeholder="End"
                                            />
                                        </div>
                                    </div>
                                )}
                                {isEditable && (
                                    <DeleteButton onClick={() => onContentChange(data.filter((_: any, i: number) => i !== index))} />
                                )}
                            </div>
                        </div>
                        <EditableText
                            value={project.description}
                            onChange={(val) => handleProjectChange(index, 'description', val)}
                            isEditable={isEditable}
                            tagName="p"
                            multiline
                            style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '0.5rem', lineHeight: '1.7' }}
                            placeholder="Describe the project, technologies used, and your contributions..."
                        />
                    </div>
                ))}
            </div>
            {isEditable && (
                <ActionButton onClick={() => onContentChange([...(data || []), { name: '', description: '', url: '', startDate: '', endDate: '' }])}>
                    <Plus size={16} /> Add Project
                </ActionButton>
            )}
        </div>
    );
};
