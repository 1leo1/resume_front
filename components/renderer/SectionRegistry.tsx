import React from 'react';
import {
    HeaderSection,
    SummarySection,
    WorkSection,
    EducationSection,
    SkillsSection,
    ProjectsSection,
    LanguagesSection,
    AwardsSection,
    VolunteerSection,
    ReferencesSection,
    ContactSection
} from './sections';

const SECTION_MAP: Record<string, React.FC<any>> = {
    header: HeaderSection,
    summary: SummarySection,
    work: WorkSection,
    experience: WorkSection, // Alias
    education: EducationSection,
    skills: SkillsSection,
    projects: ProjectsSection,
    languages: LanguagesSection,
    awards: AwardsSection,
    volunteer: VolunteerSection,
    references: ReferencesSection,
    contact: ContactSection,
};

export const getSectionComponent = (id: string) => {
    return SECTION_MAP[id] || (({ data }: any) => <div style={{ padding: '1rem', border: '1px dashed red' }}>Unknown Section: {id}</div>);
};
