import { JobBlueprint, UserSectionConfig, SectionConfig } from '@/types/blueprint';
import { ResumeContent } from '@/types/resume';

const defaultTitles: Record<string, string> = {
    header: 'Header',
    summary: 'Professional Summary',
    work: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects',
    languages: 'Languages',
    awards: 'Awards',
    volunteer: 'Volunteering',
    references: 'References',
    publications: 'Publications'
};

export function getFinalSections(
    blueprint: JobBlueprint,
    userConfig: UserSectionConfig,
    rawData: ResumeContent
): SectionConfig[] {

    // 1. Start with the Blueprint (Industry Standard)
    // If blueprint is null (legacy resumes), fallback to standard sections
    const defaultSections = blueprint?.default_sections || ['header', 'summary', 'work', 'education', 'skills'];
    const overrides = blueprint?.section_overrides || {};

    // Combine blueprint sections with any extra sections the user has added to their order
    const allSectionIds = Array.from(new Set([
        ...defaultSections,
        ...(userConfig?.order || [])
    ]));

    let sections: SectionConfig[] = allSectionIds.map(secId => ({
        id: secId,
        isVisible: true,
        title: overrides[secId]?.title || defaultTitles[secId] || secId,
        componentType: 'standard'
    }));

    // 2. Apply User Overrides (The Granularity)
    // (User might have hidden a section or renamed it)
    if (userConfig) {
        sections = sections.map(sec => ({
            ...sec,
            isVisible: userConfig.hidden?.includes(sec.id) ? false : sec.isVisible,
            title: userConfig.titles?.[sec.id] || sec.title
        }));
    }

    // 3. Inject Custom Sections (The Flexibility)
    if (rawData.custom_sections) {
        rawData.custom_sections.forEach(custom => {
            sections.push({
                id: custom.id,
                isVisible: true,
                title: custom.title,
                componentType: 'custom_list' // or based on custom.type
            });
        });
    }

    // 4. Sort based on User Preference
    if (userConfig?.order && userConfig.order.length > 0) {
        sections.sort((a, b) => {
            const indexA = userConfig.order.indexOf(a.id);
            const indexB = userConfig.order.indexOf(b.id);

            // If not in order array, put at the end
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;

            return indexA - indexB;
        });
    }

    return sections.filter(s => s.isVisible);
}
