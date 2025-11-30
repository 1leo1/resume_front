import { ResumeContent } from "@/types/resume";

export const getPlaceholderData = (industry: string, experience: string): ResumeContent => {
    const isTech = industry.toLowerCase().includes("tech") || industry.toLowerCase().includes("software");
    const isFinance = industry.toLowerCase().includes("finance") || industry.toLowerCase().includes("bank");

    // Default to Tech if unknown, or generic
    if (isTech) {
        return {
            basics: {
                name: "Alex Developer",
                email: "alex.dev@example.com",
                phone: "+1 (555) 123-4567",
                summary: "Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Expert in React, Node.js, and Cloud Architecture.",
                location: {
                    city: "San Francisco",
                    region: "CA"
                }
            },
            work: [
                {
                    name: "Tech Solutions Inc.",
                    position: "Senior Software Engineer",
                    startDate: "2020-01",
                    endDate: "Present",
                    summary: "Leading a team of 5 developers to build a next-gen SaaS platform.",
                    highlights: [
                        "Architected and deployed a microservices-based backend using Python and FastAPI.",
                        "Reduced page load time by 40% through frontend optimization.",
                        "Mentored junior developers and established code quality standards."
                    ]
                },
                {
                    name: "WebCorp",
                    position: "Software Developer",
                    startDate: "2017-06",
                    endDate: "2019-12",
                    summary: "Developed and maintained client-facing web applications.",
                    highlights: [
                        "Implemented responsive designs using React and Tailwind CSS.",
                        "Collaborated with UX designers to improve user journey.",
                        "Integrated third-party APIs for payment processing."
                    ]
                }
            ],
            education: [
                {
                    institution: "University of Technology",
                    area: "Computer Science",
                    studyType: "Bachelor of Science",
                    startDate: "2013-09",
                    endDate: "2017-05",
                    score: "3.8 GPA"
                }
            ],
            skills: [
                { name: "JavaScript/TypeScript", level: "Expert" },
                { name: "React/Next.js", level: "Expert" },
                { name: "Python", level: "Advanced" },
                { name: "AWS", level: "Intermediate" },
                { name: "Docker", level: "Intermediate" }
            ],
            languages: [
                { language: "English", fluency: "Native" },
                { language: "Spanish", fluency: "Intermediate" }
            ],
            projects: [
                {
                    name: "E-commerce Platform",
                    description: "A full-featured online store built with Next.js and Stripe.",
                    highlights: ["Implemented secure checkout flow", "Optimized image loading for performance"],
                    url: "https://github.com/alexdev/ecommerce"
                }
            ],
            awards: [],
            volunteer: [],
            references: [],
            publications: []
        };
    }

    if (isFinance) {
        return {
            basics: {
                name: "Jordan Finance",
                email: "jordan.fin@example.com",
                phone: "+1 (555) 987-6543",
                summary: "Detail-oriented Financial Analyst with a strong background in data modeling and market research. Proven track record of improving investment strategies.",
                location: {
                    city: "New York",
                    region: "NY"
                }
            },
            work: [
                {
                    name: "Global Bank",
                    position: "Senior Financial Analyst",
                    startDate: "2019-03",
                    endDate: "Present",
                    summary: "Analyzing market trends and providing investment recommendations.",
                    highlights: [
                        "Managed a portfolio of $50M+ assets with a 15% annual return.",
                        "Automated financial reporting processes using Python and Excel macros.",
                        "Presented quarterly financial reports to executive stakeholders."
                    ]
                },
                {
                    name: "Investment Group",
                    position: "Junior Analyst",
                    startDate: "2016-07",
                    endDate: "2019-02",
                    summary: "Supported senior analysts in data collection and model building.",
                    highlights: [
                        "Conducted due diligence on potential investment opportunities.",
                        "Prepared pitch decks for client meetings."
                    ]
                }
            ],
            education: [
                {
                    institution: "Business School",
                    area: "Finance",
                    studyType: "Master of Business Administration",
                    startDate: "2014-09",
                    endDate: "2016-05",
                    score: "Cum Laude"
                }
            ],
            skills: [
                { name: "Financial Modeling", level: "Expert" },
                { name: "Excel/VBA", level: "Expert" },
                { name: "Python (Pandas)", level: "Advanced" },
                { name: "SQL", level: "Intermediate" }
            ],
            languages: [
                { language: "English", fluency: "Native" },
                { language: "Mandarin", fluency: "Conversational" }
            ],
            projects: [],
            awards: [],
            volunteer: [],
            references: [],
            publications: []
        };
    }

    // Generic Fallback
    return {
        basics: {
            name: "Your Name",
            email: "email@example.com",
            phone: "+1 (555) 000-0000",
            summary: "Professional summary goes here. Describe your key strengths and experience.",
            location: {
                city: "City",
                region: "State"
            }
        },
        work: [
            {
                name: "Company Name",
                position: "Job Title",
                startDate: "2020-01",
                endDate: "Present",
                summary: "Description of your role and responsibilities.",
                highlights: [
                    "Key achievement or responsibility 1",
                    "Key achievement or responsibility 2"
                ]
            }
        ],
        education: [
            {
                institution: "University Name",
                area: "Field of Study",
                studyType: "Degree",
                startDate: "2016-09",
                endDate: "2020-05",
                score: ""
            }
        ],
        skills: [
            { name: "Skill 1", level: "" },
            { name: "Skill 2", level: "" }
        ],
        languages: [],
        projects: [],
        awards: [],
        volunteer: [],
        references: [],
        publications: []
    };
};
