-- Seed Profession-Specific Dummy Data for All Templates
-- This creates unique, realistic dummy data for each industry
-- Each template will have appropriate profession data when selected

BEGIN;

-- Clear existing dummy data
TRUNCATE template_dummy_data;

-- =====================================================
-- TECHNOLOGY INDUSTRY DUMMY DATA
-- =====================================================
INSERT INTO template_dummy_data (template_slug, industry, data)
SELECT slug, 'tech', '{
  "header": {
    "name": "Jordan Chen",
    "title": "Senior Software Engineer",
    "email": "jordan.chen@email.com",
    "phone": "(415) 555-0147",
    "location": "San Francisco, CA",
    "linkedin": "linkedin.com/in/jordanchen",
    "website": "jordanchen.dev"
  },
  "summary": "Full-stack software engineer with 8+ years of experience building scalable web applications and distributed systems. Expert in React, Node.js, Python, and cloud infrastructure. Led teams of 5-12 engineers, delivering products used by millions of users. Passionate about clean code, mentoring junior developers, and driving technical excellence.",
  "work": [
    {
      "company": "Stripe",
      "position": "Senior Software Engineer",
      "location": "San Francisco, CA",
      "startDate": "2021",
      "endDate": "Present",
      "highlights": [
        "Architected and built real-time payment processing system handling $50B+ annually",
        "Led migration from monolith to microservices, reducing deployment time by 70%",
        "Mentored 6 junior engineers, with 4 promoted to mid-level within 18 months",
        "Reduced API latency by 40% through Redis caching and query optimization"
      ]
    },
    {
      "company": "Airbnb",
      "position": "Software Engineer",
      "location": "San Francisco, CA",
      "startDate": "2018",
      "endDate": "2021",
      "highlights": [
        "Built search ranking algorithm improving booking conversion by 23%",
        "Developed React Native mobile features used by 10M+ monthly active users",
        "Created automated testing framework reducing QA time by 50%",
        "Collaborated with data science team on ML-powered recommendation engine"
      ]
    },
    {
      "company": "Dropbox",
      "position": "Junior Software Engineer",
      "location": "San Francisco, CA",
      "startDate": "2016",
      "endDate": "2018",
      "highlights": [
        "Implemented file sync optimization reducing bandwidth usage by 35%",
        "Built internal developer tools used by 200+ engineers daily",
        "Contributed to open-source projects with 1,000+ GitHub stars"
      ]
    }
  ],
  "education": [
    {
      "institution": "Stanford University",
      "degree": "M.S. Computer Science",
      "location": "Stanford, CA",
      "graduationDate": "2016",
      "details": "Focus: Distributed Systems and Machine Learning. GPA: 3.9/4.0"
    },
    {
      "institution": "UC Berkeley",
      "degree": "B.S. Computer Science",
      "location": "Berkeley, CA",
      "graduationDate": "2014",
      "details": "Dean''s List. ACM Programming Competition Finalist."
    }
  ],
  "skills": [
    { "category": "Languages", "items": ["JavaScript/TypeScript", "Python", "Go", "Rust", "SQL"] },
    { "category": "Frontend", "items": ["React", "Next.js", "Vue.js", "Tailwind CSS", "GraphQL"] },
    { "category": "Backend", "items": ["Node.js", "Django", "PostgreSQL", "Redis", "Kafka"] },
    { "category": "Cloud/DevOps", "items": ["AWS", "GCP", "Kubernetes", "Docker", "Terraform", "CI/CD"] }
  ],
  "projects": [
    {
      "name": "OpenAPI Generator",
      "description": "Open-source tool for generating type-safe API clients",
      "highlights": ["5,000+ GitHub stars", "Used by Fortune 500 companies", "Featured in JavaScript Weekly"]
    },
    {
      "name": "RealTime Analytics Dashboard",
      "description": "Built streaming analytics platform processing 1M events/second",
      "highlights": ["WebSocket-based real-time updates", "Reduced monitoring costs by 60%"]
    }
  ],
  "awards": [
    { "title": "Patent: Distributed Cache Invalidation System", "issuer": "USPTO", "date": "2023" },
    { "title": "Stripe Hack Week Winner", "issuer": "Stripe", "date": "2022" },
    { "title": "Top 10 Tech Innovators Under 35", "issuer": "TechCrunch", "date": "2021" }
  ]
}'::jsonb
FROM templates;

-- =====================================================
-- BUSINESS & FINANCE INDUSTRY DUMMY DATA
-- =====================================================
INSERT INTO template_dummy_data (template_slug, industry, data)
SELECT slug, 'business', '{
  "header": {
    "name": "Alexandra Morrison",
    "title": "Senior Financial Analyst",
    "email": "alexandra.morrison@email.com",
    "phone": "(212) 555-0198",
    "location": "New York, NY",
    "linkedin": "linkedin.com/in/alexandramorrison"
  },
  "summary": "Results-driven financial analyst with 7+ years of experience in investment banking, M&A transactions, and corporate finance. Expertise in financial modeling, valuation, and strategic planning. Successfully closed $2.5B+ in transactions. CFA Charterholder with strong analytical skills and proven track record of delivering actionable insights to C-suite executives.",
  "work": [
    {
      "company": "Goldman Sachs",
      "position": "Vice President, M&A Advisory",
      "location": "New York, NY",
      "startDate": "2020",
      "endDate": "Present",
      "highlights": [
        "Led due diligence and execution for 15+ M&A transactions totaling $1.8B",
        "Built comprehensive financial models for Fortune 500 acquisition targets",
        "Managed cross-functional teams of 8-12 analysts and associates",
        "Developed client presentations for board-level strategic reviews"
      ]
    },
    {
      "company": "Morgan Stanley",
      "position": "Associate, Investment Banking",
      "location": "New York, NY",
      "startDate": "2017",
      "endDate": "2020",
      "highlights": [
        "Executed $700M healthcare sector IPO, oversubscribed by 3x",
        "Created DCF, LBO, and comparable company valuation models",
        "Conducted industry research supporting 25+ client pitches",
        "Trained and supervised 4 incoming analysts"
      ]
    },
    {
      "company": "Deloitte",
      "position": "Financial Analyst",
      "location": "Boston, MA",
      "startDate": "2015",
      "endDate": "2017",
      "highlights": [
        "Performed financial analysis for Fortune 500 audit clients",
        "Identified $15M in cost-saving opportunities through process optimization",
        "Developed automated reporting tools reducing monthly close time by 40%"
      ]
    }
  ],
  "education": [
    {
      "institution": "The Wharton School, University of Pennsylvania",
      "degree": "MBA, Finance & Strategic Management",
      "location": "Philadelphia, PA",
      "graduationDate": "2020",
      "details": "Dean''s List. Investment Management Club President."
    },
    {
      "institution": "Boston University",
      "degree": "B.S. Finance, Minor in Economics",
      "location": "Boston, MA",
      "graduationDate": "2015",
      "details": "Magna Cum Laude. GPA: 3.8/4.0"
    }
  ],
  "skills": [
    { "category": "Financial Analysis", "items": ["DCF Valuation", "LBO Modeling", "M&A Analysis", "Financial Forecasting"] },
    { "category": "Tools", "items": ["Excel (Advanced)", "Bloomberg Terminal", "Capital IQ", "Tableau", "SQL"] },
    { "category": "Certifications", "items": ["CFA Charterholder", "Series 7 & 63", "Financial Modeling Certification"] }
  ],
  "awards": [
    { "title": "Top Performer Award", "issuer": "Goldman Sachs", "date": "2022" },
    { "title": "Deal of the Year - Healthcare M&A", "issuer": "Morgan Stanley", "date": "2019" },
    { "title": "CFA Institute Research Challenge Finalist", "issuer": "CFA Institute", "date": "2015" }
  ]
}'::jsonb
FROM templates;

-- =====================================================
-- HEALTHCARE INDUSTRY DUMMY DATA
-- =====================================================
INSERT INTO template_dummy_data (template_slug, industry, data)
SELECT slug, 'healthcare', '{
  "header": {
    "name": "Dr. Sarah Mitchell",
    "title": "Board-Certified Internal Medicine Physician",
    "email": "sarah.mitchell.md@email.com",
    "phone": "(617) 555-0234",
    "location": "Boston, MA",
    "linkedin": "linkedin.com/in/drsarahmitchell"
  },
  "summary": "Board-certified internal medicine physician with 10+ years of clinical experience in hospital and outpatient settings. Expertise in chronic disease management, preventive care, and patient-centered medicine. Published researcher with 15+ peer-reviewed publications. Dedicated to improving patient outcomes through evidence-based practice and interdisciplinary collaboration.",
  "work": [
    {
      "company": "Massachusetts General Hospital",
      "position": "Attending Physician, Internal Medicine",
      "location": "Boston, MA",
      "startDate": "2019",
      "endDate": "Present",
      "highlights": [
        "Manage panel of 1,500+ patients with complex chronic conditions",
        "Reduced hospital readmission rates by 28% through care coordination",
        "Lead quality improvement initiatives for diabetes management program",
        "Precept medical residents and students in clinical rotations"
      ]
    },
    {
      "company": "Brigham and Women''s Hospital",
      "position": "Chief Medical Resident",
      "location": "Boston, MA",
      "startDate": "2017",
      "endDate": "2019",
      "highlights": [
        "Supervised 45 internal medicine residents across inpatient services",
        "Coordinated weekly Grand Rounds and educational conferences",
        "Implemented new handoff protocol reducing adverse events by 35%",
        "Recognized with Excellence in Teaching Award"
      ]
    },
    {
      "company": "Johns Hopkins Hospital",
      "position": "Internal Medicine Resident",
      "location": "Baltimore, MD",
      "startDate": "2014",
      "endDate": "2017",
      "highlights": [
        "Completed 3-year categorical residency with distinction",
        "Rotated through ICU, cardiology, oncology, and primary care",
        "Published 5 case reports and research abstracts"
      ]
    }
  ],
  "education": [
    {
      "institution": "Harvard Medical School",
      "degree": "Doctor of Medicine (M.D.)",
      "location": "Boston, MA",
      "graduationDate": "2014",
      "details": "Alpha Omega Alpha Honor Society. Research in Cardiovascular Medicine."
    },
    {
      "institution": "Yale University",
      "degree": "B.S. Molecular Biology",
      "location": "New Haven, CT",
      "graduationDate": "2010",
      "details": "Summa Cum Laude. Phi Beta Kappa."
    }
  ],
  "skills": [
    { "category": "Clinical Expertise", "items": ["Internal Medicine", "Chronic Disease Management", "Preventive Care", "Critical Care"] },
    { "category": "Procedures", "items": ["Central Line Placement", "Lumbar Puncture", "Paracentesis", "Joint Aspiration"] },
    { "category": "Systems", "items": ["Epic EMR", "Cerner", "MEDITECH", "Clinical Decision Support"] }
  ],
  "awards": [
    { "title": "Excellence in Patient Care Award", "issuer": "Massachusetts General Hospital", "date": "2023" },
    { "title": "Best Clinical Educator", "issuer": "HMS Department of Medicine", "date": "2021" },
    { "title": "Research Excellence Award", "issuer": "American College of Physicians", "date": "2019" }
  ],
  "certifications": [
    { "name": "Board Certified - Internal Medicine", "issuer": "ABIM", "date": "2017" },
    { "name": "Basic Life Support (BLS)", "issuer": "American Heart Association", "date": "2024" },
    { "name": "Advanced Cardiovascular Life Support (ACLS)", "issuer": "American Heart Association", "date": "2024" }
  ]
}'::jsonb
FROM templates;

-- =====================================================
-- CREATIVE & DESIGN INDUSTRY DUMMY DATA
-- =====================================================
INSERT INTO template_dummy_data (template_slug, industry, data)
SELECT slug, 'creative', '{
  "header": {
    "name": "Maya Rodriguez",
    "title": "Senior Product Designer",
    "email": "maya@mayarodriguez.design",
    "phone": "(323) 555-0156",
    "location": "Los Angeles, CA",
    "linkedin": "linkedin.com/in/mayarodriguezdesign",
    "website": "mayarodriguez.design"
  },
  "summary": "Award-winning product designer with 8+ years crafting intuitive digital experiences for startups and Fortune 500 companies. Expert in design systems, user research, and prototyping. Led design for products reaching 50M+ users. Passionate about accessibility, inclusive design, and bridging the gap between user needs and business goals.",
  "work": [
    {
      "company": "Spotify",
      "position": "Senior Product Designer",
      "location": "Los Angeles, CA",
      "startDate": "2021",
      "endDate": "Present",
      "highlights": [
        "Lead designer for Spotify Wrapped, reaching 150M+ users globally",
        "Built and maintained design system used by 40+ product teams",
        "Increased user engagement by 32% through redesigned discovery features",
        "Mentored 4 junior designers, facilitating career growth and skill development"
      ]
    },
    {
      "company": "Figma",
      "position": "Product Designer",
      "location": "San Francisco, CA",
      "startDate": "2018",
      "endDate": "2021",
      "highlights": [
        "Designed core collaboration features including real-time commenting",
        "Conducted 100+ user research sessions informing product roadmap",
        "Created FigJam templates downloaded 500K+ times",
        "Contributed to Figma Community growth from 1M to 10M users"
      ]
    },
    {
      "company": "IDEO",
      "position": "Interaction Designer",
      "location": "Palo Alto, CA",
      "startDate": "2016",
      "endDate": "2018",
      "highlights": [
        "Designed digital products for healthcare, finance, and retail clients",
        "Facilitated design thinking workshops for Fortune 500 executives",
        "Won Core77 Design Award for innovative healthcare app"
      ]
    }
  ],
  "education": [
    {
      "institution": "Rhode Island School of Design",
      "degree": "MFA, Graphic Design",
      "location": "Providence, RI",
      "graduationDate": "2016",
      "details": "Thesis: Designing for Emotional Accessibility"
    },
    {
      "institution": "UCLA",
      "degree": "B.A. Design Media Arts",
      "location": "Los Angeles, CA",
      "graduationDate": "2014",
      "details": "Graduated with Honors. Student Design Award Winner."
    }
  ],
  "skills": [
    { "category": "Design", "items": ["UI/UX Design", "Design Systems", "Prototyping", "Visual Design", "Motion Design"] },
    { "category": "Tools", "items": ["Figma", "Sketch", "Adobe Creative Suite", "Principle", "Framer"] },
    { "category": "Research", "items": ["User Research", "Usability Testing", "A/B Testing", "Journey Mapping"] }
  ],
  "projects": [
    {
      "name": "Design System - Harmony",
      "description": "Created comprehensive design system adopted by 3 product teams",
      "highlights": ["100+ reusable components", "Reduced design-to-dev time by 45%", "Featured on Design Systems Repo"]
    },
    {
      "name": "Accessible Music Player",
      "description": "Redesigned music player interface for visually impaired users",
      "highlights": ["WCAG 2.1 AAA compliant", "Featured in Apple Accessibility Showcase"]
    }
  ],
  "awards": [
    { "title": "Apple Design Award Finalist", "issuer": "Apple", "date": "2023" },
    { "title": "Webby Award - Best User Experience", "issuer": "Webby Awards", "date": "2022" },
    { "title": "Core77 Design Award - Interaction", "issuer": "Core77", "date": "2018" }
  ]
}'::jsonb
FROM templates;

-- =====================================================
-- MARKETING & SALES INDUSTRY DUMMY DATA
-- =====================================================
INSERT INTO template_dummy_data (template_slug, industry, data)
SELECT slug, 'marketing', '{
  "header": {
    "name": "Marcus Johnson",
    "title": "Director of Digital Marketing",
    "email": "marcus.johnson@email.com",
    "phone": "(312) 555-0189",
    "location": "Chicago, IL",
    "linkedin": "linkedin.com/in/marcusjohnsonmktg"
  },
  "summary": "Data-driven marketing leader with 10+ years of experience scaling B2B and D2C brands through integrated digital strategies. Expertise in growth marketing, demand generation, and brand building. Generated $150M+ in pipeline through marketing-led initiatives. Known for building high-performing teams and delivering measurable ROI.",
  "work": [
    {
      "company": "HubSpot",
      "position": "Director of Digital Marketing",
      "location": "Chicago, IL",
      "startDate": "2020",
      "endDate": "Present",
      "highlights": [
        "Scaled marketing-sourced revenue from $20M to $75M annually",
        "Built and led team of 15 marketers across demand gen, content, and SEO",
        "Launched account-based marketing program generating $30M pipeline",
        "Increased organic traffic by 180% through content strategy overhaul"
      ]
    },
    {
      "company": "Salesforce",
      "position": "Senior Marketing Manager",
      "location": "San Francisco, CA",
      "startDate": "2017",
      "endDate": "2020",
      "highlights": [
        "Managed $5M annual budget for enterprise demand generation",
        "Created multi-touch attribution model improving campaign ROI by 45%",
        "Led Dreamforce marketing activation reaching 170K+ attendees",
        "Developed partner marketing program driving 25% of new ARR"
      ]
    },
    {
      "company": "Mailchimp",
      "position": "Growth Marketing Manager",
      "location": "Atlanta, GA",
      "startDate": "2014",
      "endDate": "2017",
      "highlights": [
        "Grew email subscriber base from 100K to 2M through viral campaigns",
        "Optimized conversion funnel increasing trial-to-paid by 35%",
        "Launched referral program generating 40% of new user acquisition"
      ]
    }
  ],
  "education": [
    {
      "institution": "Northwestern University - Kellogg School of Management",
      "degree": "MBA, Marketing",
      "location": "Evanston, IL",
      "graduationDate": "2014",
      "details": "Marketing Club President. Case Competition Winner."
    },
    {
      "institution": "University of Michigan",
      "degree": "B.A. Communications",
      "location": "Ann Arbor, MI",
      "graduationDate": "2010",
      "details": "Dean''s List. Varsity Track & Field."
    }
  ],
  "skills": [
    { "category": "Marketing", "items": ["Demand Generation", "Content Marketing", "SEO/SEM", "ABM", "Brand Strategy"] },
    { "category": "Tools", "items": ["HubSpot", "Salesforce", "Google Analytics", "Marketo", "Tableau"] },
    { "category": "Leadership", "items": ["Team Building", "Budget Management", "Cross-functional Collaboration", "Strategic Planning"] }
  ],
  "awards": [
    { "title": "CMO of the Year Finalist", "issuer": "B2B Marketing Exchange", "date": "2023" },
    { "title": "Best B2B Marketing Campaign", "issuer": "Content Marketing Institute", "date": "2022" },
    { "title": "40 Under 40 - Marketing", "issuer": "AdAge", "date": "2021" }
  ]
}'::jsonb
FROM templates;

-- =====================================================
-- EDUCATION INDUSTRY DUMMY DATA
-- =====================================================
INSERT INTO template_dummy_data (template_slug, industry, data)
SELECT slug, 'education', '{
  "header": {
    "name": "Dr. Emily Watson",
    "title": "Associate Professor of Educational Psychology",
    "email": "emily.watson@university.edu",
    "phone": "(512) 555-0167",
    "location": "Austin, TX",
    "linkedin": "linkedin.com/in/dremilywatson"
  },
  "summary": "Dedicated educator and researcher with 12+ years of experience in higher education. Expertise in educational psychology, curriculum development, and instructional design. Published 30+ peer-reviewed articles and secured $2M+ in research funding. Committed to fostering inclusive learning environments and preparing the next generation of educators.",
  "work": [
    {
      "company": "University of Texas at Austin",
      "position": "Associate Professor, Educational Psychology",
      "location": "Austin, TX",
      "startDate": "2018",
      "endDate": "Present",
      "highlights": [
        "Teach undergraduate and graduate courses with 4.8/5.0 student ratings",
        "Secured $1.2M NSF grant for research on adaptive learning technologies",
        "Advise 8 doctoral students and 12 master''s students",
        "Published 15 peer-reviewed articles in top-tier journals"
      ]
    },
    {
      "company": "Stanford University",
      "position": "Postdoctoral Research Fellow",
      "location": "Stanford, CA",
      "startDate": "2015",
      "endDate": "2018",
      "highlights": [
        "Led research on growth mindset interventions in K-12 settings",
        "Collaborated with 25 school districts reaching 50,000+ students",
        "Published findings in Science of Learning journal",
        "Presented at 12 national and international conferences"
      ]
    },
    {
      "company": "Denver Public Schools",
      "position": "High School Psychology Teacher",
      "location": "Denver, CO",
      "startDate": "2010",
      "endDate": "2015",
      "highlights": [
        "Taught AP Psychology with 85% of students scoring 4 or 5",
        "Developed innovative curriculum adopted district-wide",
        "Mentored 15 student teachers from local universities"
      ]
    }
  ],
  "education": [
    {
      "institution": "University of Michigan",
      "degree": "Ph.D. Educational Psychology",
      "location": "Ann Arbor, MI",
      "graduationDate": "2015",
      "details": "Dissertation: Metacognitive Strategies in Online Learning Environments"
    },
    {
      "institution": "Columbia University - Teachers College",
      "degree": "M.A. Cognitive Studies in Education",
      "location": "New York, NY",
      "graduationDate": "2010"
    },
    {
      "institution": "University of Colorado Boulder",
      "degree": "B.A. Psychology, Education Minor",
      "location": "Boulder, CO",
      "graduationDate": "2008",
      "details": "Summa Cum Laude. Phi Beta Kappa."
    }
  ],
  "skills": [
    { "category": "Teaching", "items": ["Curriculum Design", "Instructional Technology", "Assessment Development", "Online Learning"] },
    { "category": "Research", "items": ["Quantitative Methods", "Experimental Design", "SPSS", "R", "Grant Writing"] },
    { "category": "Administration", "items": ["Accreditation", "Program Development", "Faculty Mentoring", "Committee Leadership"] }
  ],
  "publications": [
    { "title": "Growth Mindset Interventions: A Meta-Analysis", "journal": "Review of Educational Research", "year": "2022" },
    { "title": "Adaptive Learning Technologies in Higher Education", "journal": "Journal of Educational Psychology", "year": "2021" },
    { "title": "Metacognition and Self-Regulated Learning", "journal": "Educational Psychologist", "year": "2019" }
  ],
  "awards": [
    { "title": "Excellence in Teaching Award", "issuer": "UT Austin College of Education", "date": "2023" },
    { "title": "Early Career Research Award", "issuer": "American Educational Research Association", "date": "2020" },
    { "title": "Outstanding Dissertation Award", "issuer": "APA Division 15", "date": "2016" }
  ]
}'::jsonb
FROM templates;

-- =====================================================
-- LEGAL INDUSTRY DUMMY DATA
-- =====================================================
INSERT INTO template_dummy_data (template_slug, industry, data)
SELECT slug, 'legal', '{
  "header": {
    "name": "Jonathan Clarke",
    "title": "Senior Associate Attorney",
    "email": "jclarke@lawfirm.com",
    "phone": "(202) 555-0142",
    "location": "Washington, D.C.",
    "linkedin": "linkedin.com/in/jonathanclarkeesq"
  },
  "summary": "Accomplished corporate attorney with 8+ years of experience in mergers and acquisitions, securities regulation, and corporate governance. Closed $5B+ in complex transactions for Fortune 500 clients. Known for strategic thinking, meticulous attention to detail, and ability to navigate complex regulatory environments. Admitted to practice in DC, NY, and before the SEC.",
  "work": [
    {
      "company": "Sullivan & Cromwell LLP",
      "position": "Senior Associate, Corporate/M&A",
      "location": "Washington, D.C.",
      "startDate": "2019",
      "endDate": "Present",
      "highlights": [
        "Lead associate on $3.2B cross-border acquisition in technology sector",
        "Advise public company boards on governance, disclosure, and fiduciary duties",
        "Drafted and negotiated merger agreements, stock purchase agreements, and JV documents",
        "Manage teams of 5-8 associates and coordinate with foreign counsel"
      ]
    },
    {
      "company": "Skadden, Arps, Slate, Meagher & Flom LLP",
      "position": "Associate, Securities/Capital Markets",
      "location": "New York, NY",
      "startDate": "2016",
      "endDate": "2019",
      "highlights": [
        "Executed $2B IPO for fintech company on NYSE",
        "Prepared SEC filings including S-1, 10-K, 10-Q, and 8-K",
        "Advised on securities law compliance for private placements",
        "Conducted due diligence for 20+ M&A transactions"
      ]
    },
    {
      "company": "U.S. Securities and Exchange Commission",
      "position": "Legal Intern, Division of Corporation Finance",
      "location": "Washington, D.C.",
      "startDate": "2015",
      "endDate": "2016",
      "highlights": [
        "Reviewed registration statements and periodic reports",
        "Drafted comment letters to public companies",
        "Researched emerging issues in securities regulation"
      ]
    }
  ],
  "education": [
    {
      "institution": "Harvard Law School",
      "degree": "Juris Doctor",
      "location": "Cambridge, MA",
      "graduationDate": "2016",
      "details": "Harvard Law Review. Ames Moot Court Competition Semifinalist."
    },
    {
      "institution": "Georgetown University",
      "degree": "B.A. Government, Economics Minor",
      "location": "Washington, D.C.",
      "graduationDate": "2013",
      "details": "Magna Cum Laude. Phi Beta Kappa."
    }
  ],
  "skills": [
    { "category": "Practice Areas", "items": ["Mergers & Acquisitions", "Securities Regulation", "Corporate Governance", "Private Equity"] },
    { "category": "Expertise", "items": ["Transaction Structuring", "Due Diligence", "Regulatory Compliance", "Contract Negotiation"] },
    { "category": "Admissions", "items": ["District of Columbia Bar", "New York State Bar", "SEC Practice"] }
  ],
  "awards": [
    { "title": "Rising Star - Corporate Law", "issuer": "Super Lawyers", "date": "2023" },
    { "title": "Pro Bono Excellence Award", "issuer": "DC Bar Foundation", "date": "2022" },
    { "title": "Best Brief Award", "issuer": "Harvard Ames Moot Court", "date": "2015" }
  ],
  "publications": [
    { "title": "SPAC Transactions: Regulatory Developments and Best Practices", "journal": "Harvard Business Law Review", "year": "2022" },
    { "title": "ESG Disclosure Requirements for Public Companies", "journal": "The Business Lawyer", "year": "2021" }
  ]
}'::jsonb
FROM templates;

-- =====================================================
-- OTHER INDUSTRY DUMMY DATA (General Professional)
-- =====================================================
INSERT INTO template_dummy_data (template_slug, industry, data)
SELECT slug, 'other', '{
  "header": {
    "name": "Taylor Anderson",
    "title": "Program Manager",
    "email": "taylor.anderson@email.com",
    "phone": "(555) 555-0123",
    "location": "Denver, CO",
    "linkedin": "linkedin.com/in/tayloranderson"
  },
  "summary": "Versatile professional with 7+ years of experience in project and program management across multiple industries. Proven track record of delivering complex initiatives on time and under budget. Strong leadership, communication, and problem-solving skills. Passionate about driving organizational efficiency and team development.",
  "work": [
    {
      "company": "Accenture",
      "position": "Senior Program Manager",
      "location": "Denver, CO",
      "startDate": "2020",
      "endDate": "Present",
      "highlights": [
        "Manage portfolio of 5 concurrent projects with combined budget of $12M",
        "Lead cross-functional teams of 25+ members across 3 time zones",
        "Implemented agile methodologies reducing project delivery time by 30%",
        "Achieved 95% client satisfaction score across all managed programs"
      ]
    },
    {
      "company": "Deloitte Consulting",
      "position": "Project Manager",
      "location": "Chicago, IL",
      "startDate": "2017",
      "endDate": "2020",
      "highlights": [
        "Delivered enterprise transformation project for Fortune 100 client",
        "Managed stakeholder relationships with C-suite executives",
        "Created project management playbook adopted by 50+ consultants",
        "Mentored 6 junior team members, 4 promoted within 2 years"
      ]
    },
    {
      "company": "General Electric",
      "position": "Operations Analyst",
      "location": "Cincinnati, OH",
      "startDate": "2015",
      "endDate": "2017",
      "highlights": [
        "Analyzed operational data to identify $3M in cost savings",
        "Developed dashboards for executive decision-making",
        "Coordinated process improvement initiatives across 4 facilities"
      ]
    }
  ],
  "education": [
    {
      "institution": "University of Colorado Boulder",
      "degree": "MBA, Operations Management",
      "location": "Boulder, CO",
      "graduationDate": "2020",
      "details": "Graduate with Distinction. Operations Excellence Club VP."
    },
    {
      "institution": "Ohio State University",
      "degree": "B.S. Business Administration",
      "location": "Columbus, OH",
      "graduationDate": "2015",
      "details": "Dean''s List. Study Abroad - London School of Economics."
    }
  ],
  "skills": [
    { "category": "Management", "items": ["Program Management", "Agile/Scrum", "Stakeholder Management", "Risk Management"] },
    { "category": "Tools", "items": ["Microsoft Project", "Jira", "Asana", "Tableau", "Excel (Advanced)"] },
    { "category": "Certifications", "items": ["PMP", "Certified Scrum Master (CSM)", "Six Sigma Green Belt"] }
  ],
  "awards": [
    { "title": "Excellence in Delivery Award", "issuer": "Accenture", "date": "2023" },
    { "title": "Rising Leader", "issuer": "Deloitte Consulting", "date": "2019" },
    { "title": "Process Innovation Award", "issuer": "General Electric", "date": "2017" }
  ]
}'::jsonb
FROM templates;

COMMIT;

-- Verification query (run this to confirm data was inserted)
-- SELECT template_slug, industry, data->>'header' as header_preview 
-- FROM template_dummy_data 
-- ORDER BY template_slug, industry;
