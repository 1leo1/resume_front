-- ClayCV Final Templates SQL
-- 10 World-Class Resume Templates for All Industries
-- Execute this SQL to populate the database with production-ready templates

-- First, clear existing templates to avoid duplicates
DELETE FROM templates WHERE slug IN (
  'modern-professional',
  'executive-suite',
  'creative-portfolio',
  'academic-scholar',
  'minimal-ats',
  'healthcare-professional',
  'legal-excellence',
  'classic-business',
  'tech-innovator',
  'marketing-pro'
);

-- ============================================================================
-- TEMPLATE 1: Modern Professional
-- Best for: Technology, Business, Marketing, Other
-- Layout: Two-column with left sidebar
-- ============================================================================
INSERT INTO templates (slug, name, description, industry, tags, structure, styles, thumbnail_url, dummy_data, is_premium) VALUES
('modern-professional', 'Modern Professional', 'A sleek, contemporary design perfect for professionals in tech, business, and marketing. Features a balanced two-column layout with clean typography and strategic use of color accents.',
'["tech", "business", "marketing", "other"]',
'["modern", "professional", "clean", "ats-friendly", "versatile"]',
'{
  "layout": {
    "type": "two-column",
    "columns": [
      {"width": "35%", "sections": ["skills", "education", "languages", "awards"]},
      {"width": "65%", "sections": ["header", "summary", "work", "projects"]}
    ]
  },
  "sections": {
    "header": {"id": "header", "type": "header", "title": "Profile"},
    "summary": {"id": "summary", "type": "summary", "title": "Professional Summary"},
    "work": {"id": "work", "type": "work", "title": "Work Experience"},
    "education": {"id": "education", "type": "education", "title": "Education"},
    "skills": {"id": "skills", "type": "skills", "title": "Skills"},
    "projects": {"id": "projects", "type": "projects", "title": "Projects"},
    "languages": {"id": "languages", "type": "languages", "title": "Languages"},
    "awards": {"id": "awards", "type": "awards", "title": "Achievements"}
  }
}',
'{"primary": "#2563eb", "accent": "#dbeafe", "font": "inter"}',
NULL,
'{
  "basics": {
    "name": "Jordan Mitchell",
    "label": "Product Manager",
    "email": "jordan.mitchell@email.com",
    "phone": "+1 (555) 234-5678",
    "summary": "Results-driven Product Manager with 6+ years of experience leading cross-functional teams to deliver innovative digital products. Proven track record of increasing user engagement by 45% and driving $10M+ in annual revenue growth. Expert in agile methodologies, data-driven decision making, and stakeholder management.",
    "location": {"city": "San Francisco", "region": "CA"}
  },
  "work": [
    {
      "name": "Stripe",
      "position": "Senior Product Manager",
      "startDate": "2021-03",
      "endDate": "Present",
      "summary": "Lead product strategy for Stripe Payments, serving 3M+ businesses globally. Launched 5 major features increasing merchant conversion by 23%. Manage a team of 8 engineers and 3 designers. Collaborate with C-suite on quarterly product roadmaps."
    },
    {
      "name": "Airbnb",
      "position": "Product Manager",
      "startDate": "2018-06",
      "endDate": "2021-02",
      "summary": "Owned the guest booking experience, optimizing the checkout flow that processes $50B+ annually. Reduced booking abandonment by 18% through A/B testing and user research. Led cross-functional team of 12."
    },
    {
      "name": "Google",
      "position": "Associate Product Manager",
      "startDate": "2016-08",
      "endDate": "2018-05",
      "summary": "Part of Google APM program. Shipped features for Google Maps used by 1B+ monthly users. Conducted user research across 5 countries to inform product decisions."
    }
  ],
  "education": [
    {
      "institution": "Stanford University",
      "area": "Computer Science",
      "studyType": "Master of Science",
      "startDate": "2014",
      "endDate": "2016"
    },
    {
      "institution": "UC Berkeley",
      "area": "Business Administration",
      "studyType": "Bachelor of Science",
      "startDate": "2010",
      "endDate": "2014"
    }
  ],
  "skills": [
    {"name": "Product Strategy"},
    {"name": "Agile/Scrum"},
    {"name": "Data Analysis"},
    {"name": "User Research"},
    {"name": "SQL"},
    {"name": "Figma"},
    {"name": "JIRA"},
    {"name": "A/B Testing"}
  ],
  "projects": [
    {
      "name": "Payment Optimization Initiative",
      "description": "Led cross-functional project to redesign checkout experience, resulting in 23% higher conversion rates and $50M incremental revenue.",
      "startDate": "2022",
      "endDate": "2023"
    }
  ],
  "languages": [
    {"language": "English", "fluency": "Native"},
    {"language": "Spanish", "fluency": "Professional"}
  ],
  "awards": [
    {"title": "Product Excellence Award", "date": "2023", "awarder": "Stripe"},
    {"title": "Top Performer", "date": "2020", "awarder": "Airbnb"}
  ],
  "volunteer": [],
  "references": [],
  "publications": []
}',
false);

-- ============================================================================
-- TEMPLATE 2: Executive Suite
-- Best for: Business, Legal, Executive-level positions
-- Layout: Elegant two-column with emphasis on leadership
-- ============================================================================
INSERT INTO templates (slug, name, description, industry, tags, structure, styles, thumbnail_url, dummy_data, is_premium) VALUES
('executive-suite', 'Executive Suite', 'Sophisticated and elegant layout designed for C-level executives and senior leaders. Features a refined two-column design with emphasis on leadership achievements and strategic impact.',
'["business", "legal", "executive", "other"]',
'["elegant", "professional", "premium", "sophisticated", "leadership"]',
'{
  "layout": {
    "type": "two-column",
    "columns": [
      {"width": "32%", "sections": ["skills", "languages", "awards"]},
      {"width": "68%", "sections": ["header", "summary", "work", "education"]}
    ]
  },
  "sections": {
    "header": {"id": "header", "type": "header", "title": "Executive Profile"},
    "summary": {"id": "summary", "type": "summary", "title": "Executive Summary"},
    "work": {"id": "work", "type": "work", "title": "Leadership Experience"},
    "education": {"id": "education", "type": "education", "title": "Education & Credentials"},
    "skills": {"id": "skills", "type": "skills", "title": "Core Competencies"},
    "languages": {"id": "languages", "type": "languages", "title": "Languages"},
    "awards": {"id": "awards", "type": "awards", "title": "Honors & Recognition"}
  }
}',
'{"primary": "#1e293b", "accent": "#f1f5f9", "font": "georgia"}',
NULL,
'{
  "basics": {
    "name": "Victoria Sterling",
    "label": "Chief Executive Officer",
    "email": "victoria.sterling@executive.com",
    "phone": "+1 (555) 800-1234",
    "summary": "Visionary executive leader with 20+ years of experience driving organizational transformation and sustainable growth. Proven track record of leading Fortune 500 companies through digital transformation, resulting in $2B+ revenue growth. Known for building high-performance teams and fostering cultures of innovation.",
    "location": {"city": "New York", "region": "NY"}
  },
  "work": [
    {
      "name": "Global Dynamics Corporation",
      "position": "Chief Executive Officer",
      "startDate": "2019-01",
      "endDate": "Present",
      "summary": "Leading a $5B multinational technology corporation with 12,000+ employees across 35 countries. Spearheaded complete digital transformation strategy, resulting in 45% revenue increase and market cap growth from $3B to $8B."
    },
    {
      "name": "Innovate Partners Inc.",
      "position": "President & COO",
      "startDate": "2014-06",
      "endDate": "2018-12",
      "summary": "Oversaw all operational functions for a leading consulting firm. Implemented operational excellence initiatives that improved margins by 18% and client satisfaction scores by 32%."
    },
    {
      "name": "TechVenture Holdings",
      "position": "Senior Vice President, Strategy",
      "startDate": "2009-03",
      "endDate": "2014-05",
      "summary": "Led corporate strategy and M&A activities. Successfully executed 12 strategic acquisitions valued at $1.2B, expanding company portfolio into emerging markets."
    }
  ],
  "education": [
    {
      "institution": "Harvard Business School",
      "area": "Business Administration",
      "studyType": "MBA",
      "startDate": "2005",
      "endDate": "2007"
    },
    {
      "institution": "Yale University",
      "area": "Economics",
      "studyType": "Bachelor of Arts",
      "startDate": "2001",
      "endDate": "2005"
    }
  ],
  "skills": [
    {"name": "Strategic Leadership"},
    {"name": "P&L Management"},
    {"name": "Digital Transformation"},
    {"name": "M&A Strategy"},
    {"name": "Board Relations"},
    {"name": "Stakeholder Management"}
  ],
  "languages": [
    {"language": "English", "fluency": "Native"},
    {"language": "French", "fluency": "Professional"},
    {"language": "Mandarin", "fluency": "Conversational"}
  ],
  "awards": [
    {"title": "CEO of the Year", "date": "2023", "awarder": "Business Leadership Awards"},
    {"title": "Top 50 Most Influential Women in Business", "date": "2022", "awarder": "Forbes"}
  ],
  "projects": [],
  "volunteer": [],
  "references": [],
  "publications": []
}',
true);

-- ============================================================================
-- TEMPLATE 3: Creative Portfolio
-- Best for: Creative & Design, Marketing
-- Layout: Bold asymmetric two-column design
-- ============================================================================
INSERT INTO templates (slug, name, description, industry, tags, structure, styles, thumbnail_url, dummy_data, is_premium) VALUES
('creative-portfolio', 'Creative Portfolio', 'Bold and visually striking layout designed for creative professionals, designers, and artists. Features a modern asymmetric design with space for showcasing creative work and awards.',
'["creative", "marketing"]',
'["bold", "modern", "creative", "visual", "artistic", "portfolio"]',
'{
  "layout": {
    "type": "two-column",
    "columns": [
      {"width": "38%", "sections": ["skills", "languages", "awards"]},
      {"width": "62%", "sections": ["header", "summary", "work", "projects", "education"]}
    ]
  },
  "sections": {
    "header": {"id": "header", "type": "header", "title": "Creative Profile"},
    "summary": {"id": "summary", "type": "summary", "title": "Creative Vision"},
    "work": {"id": "work", "type": "work", "title": "Experience"},
    "projects": {"id": "projects", "type": "projects", "title": "Featured Work"},
    "education": {"id": "education", "type": "education", "title": "Education"},
    "skills": {"id": "skills", "type": "skills", "title": "Expertise"},
    "languages": {"id": "languages", "type": "languages", "title": "Languages"},
    "awards": {"id": "awards", "type": "awards", "title": "Recognition"}
  }
}',
'{"primary": "#7c3aed", "accent": "#ede9fe", "font": "inter"}',
NULL,
'{
  "basics": {
    "name": "Maya Rodriguez",
    "label": "Senior Creative Director",
    "email": "maya@creativestudio.com",
    "phone": "+1 (555) 234-5678",
    "summary": "Award-winning Creative Director with 12+ years of experience crafting compelling brand narratives and visual identities for global brands. Passionate about pushing creative boundaries while delivering measurable business results. Led campaigns that generated $50M+ in brand value.",
    "location": {"city": "Los Angeles", "region": "CA"}
  },
  "work": [
    {
      "name": "Spark Creative Agency",
      "position": "Senior Creative Director",
      "startDate": "2020-03",
      "endDate": "Present",
      "summary": "Leading a team of 25 designers and art directors. Spearheaded rebranding initiatives for 15+ Fortune 500 clients, including Nike, Spotify, and Airbnb. Campaigns have won 8 Cannes Lions and 12 D&AD awards."
    },
    {
      "name": "IDEO",
      "position": "Lead Designer",
      "startDate": "2016-08",
      "endDate": "2020-02",
      "summary": "Led human-centered design projects for tech and healthcare clients. Pioneered new design thinking methodologies adopted company-wide. Mentored 20+ junior designers."
    },
    {
      "name": "Pentagram",
      "position": "Designer",
      "startDate": "2012-06",
      "endDate": "2016-07",
      "summary": "Contributed to award-winning brand identity and packaging design projects. Collaborated with Paula Scher on major museum and cultural institution identities."
    }
  ],
  "education": [
    {
      "institution": "Rhode Island School of Design",
      "area": "Graphic Design",
      "studyType": "MFA",
      "startDate": "2010",
      "endDate": "2012"
    },
    {
      "institution": "California College of the Arts",
      "area": "Visual Communication",
      "studyType": "BFA",
      "startDate": "2006",
      "endDate": "2010"
    }
  ],
  "skills": [
    {"name": "Brand Strategy"},
    {"name": "Visual Design"},
    {"name": "UI/UX Design"},
    {"name": "Motion Graphics"},
    {"name": "Design Systems"},
    {"name": "Creative Direction"},
    {"name": "Adobe Creative Suite"},
    {"name": "Figma"}
  ],
  "projects": [
    {
      "name": "Nike Air Max Campaign",
      "description": "Led the global visual campaign for Nike Air Max 2024 launch, spanning digital, print, and experiential touchpoints across 40 countries.",
      "url": "nike.com/airmax",
      "startDate": "2023",
      "endDate": "2024"
    },
    {
      "name": "Spotify Wrapped 2023",
      "description": "Creative direction for the annual Wrapped campaign, reaching 500M+ users worldwide with personalized visual experiences.",
      "url": "spotify.com/wrapped",
      "startDate": "2023",
      "endDate": "2023"
    }
  ],
  "languages": [
    {"language": "English", "fluency": "Native"},
    {"language": "Spanish", "fluency": "Native"}
  ],
  "awards": [
    {"title": "Cannes Lions Grand Prix", "date": "2023", "awarder": "Cannes Lions Festival"},
    {"title": "D&AD Black Pencil", "date": "2022", "awarder": "D&AD"},
    {"title": "40 Under 40 in Design", "date": "2021", "awarder": "Communication Arts"}
  ],
  "volunteer": [],
  "references": [],
  "publications": []
}',
true);

-- ============================================================================
-- TEMPLATE 4: Academic Scholar
-- Best for: Education, Research
-- Layout: Single-column with clear academic structure
-- ============================================================================
INSERT INTO templates (slug, name, description, industry, tags, structure, styles, thumbnail_url, dummy_data, is_premium) VALUES
('academic-scholar', 'Academic Scholar', 'Structured and comprehensive layout designed for academics, researchers, and educators. Emphasizes publications, research, and teaching experience with clear section organization.',
'["education", "healthcare", "other"]',
'["scholarly", "structured", "comprehensive", "academic", "research"]',
'{
  "layout": {
    "type": "single-column",
    "columns": [
      {"width": "100%", "sections": ["header", "summary", "education", "work", "projects", "awards", "skills", "languages"]}
    ]
  },
  "sections": {
    "header": {"id": "header", "type": "header", "title": "Academic Profile"},
    "summary": {"id": "summary", "type": "summary", "title": "Research Interests"},
    "education": {"id": "education", "type": "education", "title": "Education"},
    "work": {"id": "work", "type": "work", "title": "Academic Positions"},
    "projects": {"id": "projects", "type": "projects", "title": "Research & Publications"},
    "awards": {"id": "awards", "type": "awards", "title": "Grants & Awards"},
    "skills": {"id": "skills", "type": "skills", "title": "Research Methods & Tools"},
    "languages": {"id": "languages", "type": "languages", "title": "Languages"}
  }
}',
'{"primary": "#0369a1", "accent": "#e0f2fe", "font": "georgia"}',
NULL,
'{
  "basics": {
    "name": "Dr. James Chen",
    "label": "Associate Professor of Computer Science",
    "email": "jchen@stanford.edu",
    "phone": "+1 (650) 555-1234",
    "summary": "My research focuses on artificial intelligence and machine learning, with particular emphasis on developing interpretable AI systems for healthcare applications. I have published 45+ peer-reviewed papers with 8,000+ citations. My work has been featured in Nature, Science, and IEEE TPAMI.",
    "location": {"city": "Stanford", "region": "CA"}
  },
  "education": [
    {
      "institution": "Massachusetts Institute of Technology",
      "area": "Computer Science",
      "studyType": "Ph.D.",
      "startDate": "2010",
      "endDate": "2015"
    },
    {
      "institution": "University of California, Berkeley",
      "area": "Computer Science & Mathematics",
      "studyType": "B.S. (Summa Cum Laude)",
      "startDate": "2006",
      "endDate": "2010"
    }
  ],
  "work": [
    {
      "name": "Stanford University",
      "position": "Associate Professor, Computer Science",
      "startDate": "2020",
      "endDate": "Present",
      "summary": "Leading the AI for Healthcare Lab with 12 PhD students and 5 postdocs. Teaching graduate courses in Machine Learning and Deep Learning. Secured $4.5M in research funding from NIH, NSF, and industry partners."
    },
    {
      "name": "Stanford University",
      "position": "Assistant Professor, Computer Science",
      "startDate": "2015",
      "endDate": "2020",
      "summary": "Established the AI for Healthcare research group. Published groundbreaking work on interpretable deep learning for medical diagnosis. Advised 8 PhD students to completion."
    },
    {
      "name": "Google Research",
      "position": "Research Intern",
      "startDate": "2013",
      "endDate": "2014",
      "summary": "Developed novel deep learning architectures for natural language understanding. Work contributed to improvements in Google Search ranking algorithms."
    }
  ],
  "projects": [
    {
      "name": "Interpretable AI for Medical Imaging",
      "description": "Lead researcher on $2.5M NIH-funded project developing explainable AI systems for radiology. Our methods are now used in 50+ hospitals nationwide.",
      "startDate": "2021",
      "endDate": "Present"
    },
    {
      "name": "Nature Medicine Publication",
      "description": "First-author paper on deep learning for early cancer detection, cited 1,200+ times. Featured in Nature Medicine 2022.",
      "startDate": "2022",
      "endDate": "2022"
    }
  ],
  "skills": [
    {"name": "Machine Learning"},
    {"name": "Deep Learning"},
    {"name": "Python"},
    {"name": "PyTorch"},
    {"name": "TensorFlow"},
    {"name": "Statistical Analysis"},
    {"name": "Research Design"},
    {"name": "Grant Writing"}
  ],
  "languages": [
    {"language": "English", "fluency": "Native"},
    {"language": "Mandarin", "fluency": "Native"},
    {"language": "German", "fluency": "Intermediate"}
  ],
  "awards": [
    {"title": "NSF CAREER Award", "date": "2018", "awarder": "National Science Foundation"},
    {"title": "Best Paper Award", "date": "2023", "awarder": "NeurIPS"},
    {"title": "Young Investigator Award", "date": "2019", "awarder": "NIH"}
  ],
  "volunteer": [],
  "references": [],
  "publications": []
}',
true);

-- ============================================================================
-- TEMPLATE 5: Minimal ATS
-- Best for: Technology, Business, Marketing, Other (Universal)
-- Layout: Clean single-column, highly ATS-compatible
-- ============================================================================
INSERT INTO templates (slug, name, description, industry, tags, structure, styles, thumbnail_url, dummy_data, is_premium) VALUES
('minimal-ats', 'Minimal ATS', 'Clean, simple, and highly readable layout optimized for Applicant Tracking Systems (ATS). Features a single-column design with clear section headers and standard formatting that parses perfectly.',
'["tech", "business", "marketing", "other"]',
'["minimal", "ats-friendly", "clean", "simple", "optimized", "universal"]',
'{
  "layout": {
    "type": "single-column",
    "columns": [
      {"width": "100%", "sections": ["header", "summary", "work", "skills", "education", "projects"]}
    ]
  },
  "sections": {
    "header": {"id": "header", "type": "header", "title": "Contact"},
    "summary": {"id": "summary", "type": "summary", "title": "Professional Summary"},
    "work": {"id": "work", "type": "work", "title": "Work Experience"},
    "skills": {"id": "skills", "type": "skills", "title": "Skills"},
    "education": {"id": "education", "type": "education", "title": "Education"},
    "projects": {"id": "projects", "type": "projects", "title": "Projects"}
  }
}',
'{"primary": "#111827", "accent": "#f3f4f6", "font": "inter"}',
NULL,
'{
  "basics": {
    "name": "Michael Thompson",
    "label": "Full Stack Software Engineer",
    "email": "michael.thompson@email.com",
    "phone": "+1 (555) 123-4567",
    "summary": "Full Stack Software Engineer with 6 years of experience building scalable web applications and microservices. Proficient in React, Node.js, Python, and cloud technologies. Track record of delivering high-quality code on time and mentoring junior developers.",
    "location": {"city": "Seattle", "region": "WA"}
  },
  "work": [
    {
      "name": "Amazon Web Services",
      "position": "Software Development Engineer II",
      "startDate": "2021-06",
      "endDate": "Present",
      "summary": "Design and implement distributed systems for AWS Lambda service. Led migration of legacy monolith to microservices architecture, reducing latency by 40%. Mentor 3 junior engineers and conduct technical interviews."
    },
    {
      "name": "Microsoft",
      "position": "Software Engineer",
      "startDate": "2018-07",
      "endDate": "2021-05",
      "summary": "Developed features for Microsoft Teams, serving 250M+ monthly active users. Implemented real-time collaboration features using SignalR and React. Improved test coverage from 60% to 95%."
    },
    {
      "name": "Stripe",
      "position": "Software Engineering Intern",
      "startDate": "2017-06",
      "endDate": "2017-09",
      "summary": "Built internal tools for fraud detection team. Developed dashboard used by 100+ analysts daily to review suspicious transactions."
    }
  ],
  "education": [
    {
      "institution": "University of Washington",
      "area": "Computer Science",
      "studyType": "Bachelor of Science",
      "startDate": "2014",
      "endDate": "2018"
    }
  ],
  "skills": [
    {"name": "JavaScript"},
    {"name": "TypeScript"},
    {"name": "React"},
    {"name": "Node.js"},
    {"name": "Python"},
    {"name": "AWS"},
    {"name": "Docker"},
    {"name": "Kubernetes"},
    {"name": "PostgreSQL"},
    {"name": "MongoDB"},
    {"name": "Git"},
    {"name": "CI/CD"}
  ],
  "projects": [
    {
      "name": "Open Source Contribution - React Query",
      "description": "Core contributor to React Query library. Implemented caching optimizations that improved performance by 25%. 100+ commits merged.",
      "url": "github.com/tanstack/query",
      "startDate": "2022",
      "endDate": "Present"
    },
    {
      "name": "Personal Finance Tracker",
      "description": "Built a full-stack personal finance application using React, Node.js, and PostgreSQL. Features include budget tracking, expense categorization, and data visualization. 5,000+ monthly active users.",
      "url": "fintrack.app",
      "startDate": "2020",
      "endDate": "2021"
    }
  ],
  "languages": [],
  "awards": [],
  "volunteer": [],
  "references": [],
  "publications": []
}',
false);

-- ============================================================================
-- TEMPLATE 6: Healthcare Professional
-- Best for: Healthcare
-- Layout: Two-column with clinical focus
-- ============================================================================
INSERT INTO templates (slug, name, description, industry, tags, structure, styles, thumbnail_url, dummy_data, is_premium) VALUES
('healthcare-professional', 'Healthcare Professional', 'Professional and trustworthy layout designed for doctors, nurses, and healthcare professionals. Features clear organization of credentials, clinical experience, and certifications.',
'["healthcare"]',
'["professional", "medical", "clinical", "trustworthy", "credentials"]',
'{
  "layout": {
    "type": "two-column",
    "columns": [
      {"width": "35%", "sections": ["skills", "languages", "awards"]},
      {"width": "65%", "sections": ["header", "summary", "work", "education", "volunteer"]}
    ]
  },
  "sections": {
    "header": {"id": "header", "type": "header", "title": "Professional Profile"},
    "summary": {"id": "summary", "type": "summary", "title": "Professional Summary"},
    "work": {"id": "work", "type": "work", "title": "Clinical Experience"},
    "education": {"id": "education", "type": "education", "title": "Education & Training"},
    "skills": {"id": "skills", "type": "skills", "title": "Clinical Competencies"},
    "languages": {"id": "languages", "type": "languages", "title": "Languages"},
    "awards": {"id": "awards", "type": "awards", "title": "Certifications & Licenses"},
    "volunteer": {"id": "volunteer", "type": "volunteer", "title": "Community Service"}
  }
}',
'{"primary": "#0891b2", "accent": "#ecfeff", "font": "inter"}',
NULL,
'{
  "basics": {
    "name": "Dr. Sarah Mitchell, MD",
    "label": "Board-Certified Internal Medicine Physician",
    "email": "dr.mitchell@hospital.org",
    "phone": "+1 (555) 456-7890",
    "summary": "Compassionate and board-certified Internal Medicine physician with 10+ years of clinical experience. Specialized in managing complex chronic conditions and preventive care. Known for patient-centered approach and evidence-based practice. Fluent in Spanish to serve diverse patient populations.",
    "location": {"city": "Boston", "region": "MA"}
  },
  "work": [
    {
      "name": "Massachusetts General Hospital",
      "position": "Attending Physician, Internal Medicine",
      "startDate": "2018-08",
      "endDate": "Present",
      "summary": "Manage panel of 2,500+ patients with complex chronic conditions. Lead quality improvement initiatives that reduced hospital readmission rates by 22%. Supervise and mentor internal medicine residents. Serve on hospital ethics committee."
    },
    {
      "name": "Boston Medical Center",
      "position": "Internal Medicine Resident",
      "startDate": "2015-07",
      "endDate": "2018-06",
      "summary": "Completed ACGME-accredited internal medicine residency program. Chief Resident during final year. Recognized for excellence in patient care and clinical teaching."
    },
    {
      "name": "Partners in Health",
      "position": "Global Health Fellow",
      "startDate": "2014-07",
      "endDate": "2015-06",
      "summary": "Provided primary care services in underserved communities in Rwanda. Trained local healthcare workers and implemented chronic disease management protocols."
    }
  ],
  "education": [
    {
      "institution": "Harvard Medical School",
      "area": "Medicine",
      "studyType": "Doctor of Medicine (MD)",
      "startDate": "2010",
      "endDate": "2014"
    },
    {
      "institution": "Johns Hopkins University",
      "area": "Public Health",
      "studyType": "Master of Public Health (MPH)",
      "startDate": "2013",
      "endDate": "2014"
    },
    {
      "institution": "Duke University",
      "area": "Biology",
      "studyType": "Bachelor of Science (Summa Cum Laude)",
      "startDate": "2006",
      "endDate": "2010"
    }
  ],
  "skills": [
    {"name": "Primary Care"},
    {"name": "Chronic Disease Management"},
    {"name": "Preventive Medicine"},
    {"name": "Patient Education"},
    {"name": "Electronic Health Records (Epic)"},
    {"name": "Clinical Research"},
    {"name": "Quality Improvement"},
    {"name": "Medical Teaching"}
  ],
  "languages": [
    {"language": "English", "fluency": "Native"},
    {"language": "Spanish", "fluency": "Fluent"},
    {"language": "French", "fluency": "Intermediate"}
  ],
  "awards": [
    {"title": "Board Certified, Internal Medicine", "date": "2018", "awarder": "ABIM"},
    {"title": "Massachusetts Medical License", "date": "2015", "awarder": "MA Board of Registration"},
    {"title": "ACLS/BLS Certified", "date": "2024", "awarder": "American Heart Association"},
    {"title": "Excellence in Teaching Award", "date": "2023", "awarder": "MGH Department of Medicine"}
  ],
  "volunteer": [
    {
      "organization": "Boston Health Care for the Homeless",
      "position": "Volunteer Physician",
      "startDate": "2019",
      "endDate": "Present",
      "summary": "Provide primary care services to homeless individuals twice monthly. Coordinate care with social workers and community health workers."
    }
  ],
  "projects": [],
  "references": [],
  "publications": []
}',
true);

-- ============================================================================
-- TEMPLATE 7: Legal Excellence
-- Best for: Legal, Business
-- Layout: Traditional single-column with formal styling
-- ============================================================================
INSERT INTO templates (slug, name, description, industry, tags, structure, styles, thumbnail_url, dummy_data, is_premium) VALUES
('legal-excellence', 'Legal Excellence', 'Formal and authoritative layout designed for attorneys, paralegals, and legal professionals. Features traditional typography and structured presentation of cases, publications, and bar admissions.',
'["legal", "business"]',
'["formal", "traditional", "authoritative", "professional", "legal"]',
'{
  "layout": {
    "type": "single-column",
    "columns": [
      {"width": "100%", "sections": ["header", "summary", "work", "education", "awards", "skills", "languages"]}
    ]
  },
  "sections": {
    "header": {"id": "header", "type": "header", "title": "Attorney Profile"},
    "summary": {"id": "summary", "type": "summary", "title": "Professional Summary"},
    "work": {"id": "work", "type": "work", "title": "Legal Experience"},
    "education": {"id": "education", "type": "education", "title": "Education"},
    "awards": {"id": "awards", "type": "awards", "title": "Bar Admissions & Certifications"},
    "skills": {"id": "skills", "type": "skills", "title": "Practice Areas"},
    "languages": {"id": "languages", "type": "languages", "title": "Languages"}
  }
}',
'{"primary": "#334155", "accent": "#f1f5f9", "font": "georgia"}',
NULL,
'{
  "basics": {
    "name": "Alexandra Bennett, Esq.",
    "label": "Senior Partner - Corporate Law",
    "email": "abennett@lawfirm.com",
    "phone": "+1 (555) 789-0123",
    "summary": "Distinguished corporate attorney with 15+ years of experience advising Fortune 500 companies on complex M&A transactions, securities regulations, and corporate governance matters. Successfully closed deals valued at over $50B. Recognized by Chambers USA as a leading practitioner in Corporate/M&A.",
    "location": {"city": "Chicago", "region": "IL"}
  },
  "work": [
    {
      "name": "Morrison & Sterling LLP",
      "position": "Senior Partner, Corporate Department",
      "startDate": "2018-01",
      "endDate": "Present",
      "summary": "Lead the firm corporate practice group of 45 attorneys. Advise public and private company boards on governance matters, fiduciary duties, and shareholder activism. Represent clients in high-profile M&A transactions exceeding $20B in aggregate value."
    },
    {
      "name": "Davis Polk & Wardwell LLP",
      "position": "Partner",
      "startDate": "2012-01",
      "endDate": "2017-12",
      "summary": "Represented underwriters and issuers in IPOs and debt offerings totaling $15B. Advised on cross-border M&A transactions involving companies in 12 countries. Mentored and supervised teams of associates."
    },
    {
      "name": "Cravath, Swaine & Moore LLP",
      "position": "Associate",
      "startDate": "2008-09",
      "endDate": "2011-12",
      "summary": "Participated in major corporate transactions including acquisitions, divestitures, and joint ventures. Conducted due diligence and drafted transaction documentation for deals valued at $5B+."
    }
  ],
  "education": [
    {
      "institution": "Columbia Law School",
      "area": "Law",
      "studyType": "Juris Doctor (J.D.), magna cum laude",
      "startDate": "2005",
      "endDate": "2008"
    },
    {
      "institution": "University of Pennsylvania",
      "area": "Economics & Political Science",
      "studyType": "Bachelor of Arts, summa cum laude",
      "startDate": "2001",
      "endDate": "2005"
    }
  ],
  "skills": [
    {"name": "Mergers & Acquisitions"},
    {"name": "Securities Law"},
    {"name": "Corporate Governance"},
    {"name": "Private Equity"},
    {"name": "Capital Markets"},
    {"name": "Cross-Border Transactions"},
    {"name": "Due Diligence"},
    {"name": "Contract Negotiation"}
  ],
  "languages": [
    {"language": "English", "fluency": "Native"},
    {"language": "German", "fluency": "Professional"},
    {"language": "French", "fluency": "Conversational"}
  ],
  "awards": [
    {"title": "Admitted to New York State Bar", "date": "2008", "awarder": "NY Bar Association"},
    {"title": "Admitted to Illinois State Bar", "date": "2018", "awarder": "IL Bar Association"},
    {"title": "Chambers USA Leading Lawyer - Corporate/M&A", "date": "2023", "awarder": "Chambers and Partners"},
    {"title": "Super Lawyers - Corporate", "date": "2022", "awarder": "Thomson Reuters"}
  ],
  "projects": [],
  "volunteer": [],
  "references": [],
  "publications": []
}',
true);

-- ============================================================================
-- TEMPLATE 8: Classic Business
-- Best for: Business, Finance, Other
-- Layout: Traditional single-column with serif fonts
-- ============================================================================
INSERT INTO templates (slug, name, description, industry, tags, structure, styles, thumbnail_url, dummy_data, is_premium) VALUES
('classic-business', 'Classic Business', 'Timeless and refined layout for business professionals. Features traditional typography and balanced structure that conveys professionalism and reliability.',
'["business", "other"]',
'["classic", "traditional", "professional", "business", "refined"]',
'{
  "layout": {
    "type": "single-column",
    "columns": [
      {"width": "100%", "sections": ["header", "summary", "work", "education", "skills", "awards"]}
    ]
  },
  "sections": {
    "header": {"id": "header", "type": "header", "title": "Profile"},
    "summary": {"id": "summary", "type": "summary", "title": "Executive Summary"},
    "work": {"id": "work", "type": "work", "title": "Professional Experience"},
    "education": {"id": "education", "type": "education", "title": "Education"},
    "skills": {"id": "skills", "type": "skills", "title": "Core Competencies"},
    "awards": {"id": "awards", "type": "awards", "title": "Certifications & Awards"}
  }
}',
'{"primary": "#374151", "accent": "#e5e7eb", "font": "georgia"}',
NULL,
'{
  "basics": {
    "name": "Robert Harrison",
    "label": "Senior Financial Analyst",
    "email": "r.harrison@finance.com",
    "phone": "+1 (555) 456-7890",
    "summary": "Detail-oriented Senior Financial Analyst with 8+ years of experience in financial modeling, forecasting, and strategic analysis. Expert in identifying cost-saving opportunities and driving data-informed business decisions. Proven ability to communicate complex financial concepts to non-financial stakeholders.",
    "location": {"city": "New York", "region": "NY"}
  },
  "work": [
    {
      "name": "Goldman Sachs",
      "position": "Senior Financial Analyst",
      "startDate": "2020-03",
      "endDate": "Present",
      "summary": "Lead financial analysis for investment banking division with $500M+ annual revenue. Develop complex financial models for M&A valuations and strategic initiatives. Present findings to senior leadership and external clients. Mentor team of 4 junior analysts."
    },
    {
      "name": "JPMorgan Chase",
      "position": "Financial Analyst",
      "startDate": "2016-07",
      "endDate": "2020-02",
      "summary": "Performed financial analysis and forecasting for commercial banking portfolio. Created automated reporting dashboards that reduced manual work by 60%. Identified $15M in cost-saving opportunities through variance analysis."
    },
    {
      "name": "Deloitte",
      "position": "Analyst, Financial Advisory",
      "startDate": "2014-09",
      "endDate": "2016-06",
      "summary": "Supported due diligence engagements for M&A transactions totaling $2B. Developed financial models and conducted industry research for private equity clients."
    }
  ],
  "education": [
    {
      "institution": "Wharton School, University of Pennsylvania",
      "area": "Finance",
      "studyType": "Master of Business Administration (MBA)",
      "startDate": "2018",
      "endDate": "2020"
    },
    {
      "institution": "New York University",
      "area": "Finance & Accounting",
      "studyType": "Bachelor of Science",
      "startDate": "2010",
      "endDate": "2014"
    }
  ],
  "skills": [
    {"name": "Financial Modeling"},
    {"name": "Valuation"},
    {"name": "Forecasting"},
    {"name": "Excel/VBA"},
    {"name": "SQL"},
    {"name": "Tableau"},
    {"name": "Bloomberg Terminal"},
    {"name": "Financial Reporting"}
  ],
  "languages": [
    {"language": "English", "fluency": "Native"},
    {"language": "Mandarin", "fluency": "Professional"}
  ],
  "awards": [
    {"title": "CFA Charterholder", "date": "2019", "awarder": "CFA Institute"},
    {"title": "Top Performer Award", "date": "2022", "awarder": "Goldman Sachs"},
    {"title": "Financial Modeling Certification", "date": "2018", "awarder": "Wall Street Prep"}
  ],
  "projects": [],
  "volunteer": [],
  "references": [],
  "publications": []
}',
false);

-- ============================================================================
-- TEMPLATE 9: Tech Innovator
-- Best for: Technology, Startups
-- Layout: Modern two-column with tech focus
-- ============================================================================
INSERT INTO templates (slug, name, description, industry, tags, structure, styles, thumbnail_url, dummy_data, is_premium) VALUES
('tech-innovator', 'Tech Innovator', 'Dynamic and modern layout designed for software engineers, developers, and tech professionals. Emphasizes technical skills, projects, and contributions to open source.',
'["tech"]',
'["modern", "technical", "developer", "startup", "innovative"]',
'{
  "layout": {
    "type": "two-column",
    "columns": [
      {"width": "35%", "sections": ["skills", "education", "languages", "awards"]},
      {"width": "65%", "sections": ["header", "summary", "work", "projects"]}
    ]
  },
  "sections": {
    "header": {"id": "header", "type": "header", "title": "Developer Profile"},
    "summary": {"id": "summary", "type": "summary", "title": "About Me"},
    "work": {"id": "work", "type": "work", "title": "Experience"},
    "projects": {"id": "projects", "type": "projects", "title": "Projects & Open Source"},
    "education": {"id": "education", "type": "education", "title": "Education"},
    "skills": {"id": "skills", "type": "skills", "title": "Tech Stack"},
    "languages": {"id": "languages", "type": "languages", "title": "Languages"},
    "awards": {"id": "awards", "type": "awards", "title": "Certifications"}
  }
}',
'{"primary": "#0ea5e9", "accent": "#e0f2fe", "font": "inter"}',
NULL,
'{
  "basics": {
    "name": "Alex Rivera",
    "label": "Staff Software Engineer",
    "email": "alex.rivera@dev.io",
    "phone": "+1 (555) 567-8901",
    "summary": "Passionate Staff Software Engineer with 8+ years of experience building distributed systems at scale. Core contributor to major open-source projects with 10K+ GitHub stars. Expertise in Go, Rust, and cloud-native architectures. Speaker at GopherCon and KubeCon.",
    "location": {"city": "Austin", "region": "TX"}
  },
  "work": [
    {
      "name": "Vercel",
      "position": "Staff Software Engineer",
      "startDate": "2021-06",
      "endDate": "Present",
      "summary": "Technical lead for Edge Functions platform serving 100M+ requests daily. Designed and implemented V8 isolates runtime reducing cold start times by 90%. Lead team of 6 engineers working on Next.js runtime optimizations."
    },
    {
      "name": "Cloudflare",
      "position": "Senior Software Engineer",
      "startDate": "2018-03",
      "endDate": "2021-05",
      "summary": "Built core components of Workers platform using Rust and V8. Implemented security features protecting 25M+ internet properties. Open-sourced internal tools now used by thousands of developers."
    },
    {
      "name": "DigitalOcean",
      "position": "Software Engineer",
      "startDate": "2015-08",
      "endDate": "2018-02",
      "summary": "Developed Kubernetes-based container orchestration platform. Contributed to Go SDK used by 500K+ developers. Improved deployment reliability from 99.9% to 99.99%."
    }
  ],
  "education": [
    {
      "institution": "Georgia Institute of Technology",
      "area": "Computer Science",
      "studyType": "Master of Science",
      "startDate": "2013",
      "endDate": "2015"
    },
    {
      "institution": "University of Texas at Austin",
      "area": "Computer Science",
      "studyType": "Bachelor of Science",
      "startDate": "2009",
      "endDate": "2013"
    }
  ],
  "skills": [
    {"name": "Go"},
    {"name": "Rust"},
    {"name": "TypeScript"},
    {"name": "Kubernetes"},
    {"name": "Docker"},
    {"name": "PostgreSQL"},
    {"name": "Redis"},
    {"name": "gRPC"},
    {"name": "AWS"},
    {"name": "Terraform"}
  ],
  "projects": [
    {
      "name": "FastAPI Gateway",
      "description": "Created open-source API gateway in Rust with 5K+ GitHub stars. Handles 1M+ requests/second with sub-millisecond latency. Featured in The New Stack.",
      "url": "github.com/fastapi-gateway",
      "startDate": "2022",
      "endDate": "Present"
    },
    {
      "name": "K8s Operator for ML Workloads",
      "description": "Built Kubernetes operator for managing ML training jobs. Adopted by 50+ companies for production ML pipelines. Presented at KubeCon 2023.",
      "url": "github.com/ml-operator",
      "startDate": "2021",
      "endDate": "2022"
    }
  ],
  "languages": [
    {"language": "English", "fluency": "Native"},
    {"language": "Spanish", "fluency": "Native"}
  ],
  "awards": [
    {"title": "AWS Solutions Architect Professional", "date": "2022", "awarder": "Amazon Web Services"},
    {"title": "CKA - Certified Kubernetes Administrator", "date": "2021", "awarder": "CNCF"}
  ],
  "volunteer": [],
  "references": [],
  "publications": []
}',
false);

-- ============================================================================
-- TEMPLATE 10: Marketing Pro
-- Best for: Marketing, Sales, Business
-- Layout: Vibrant two-column with results focus
-- ============================================================================
INSERT INTO templates (slug, name, description, industry, tags, structure, styles, thumbnail_url, dummy_data, is_premium) VALUES
('marketing-pro', 'Marketing Pro', 'Dynamic and results-driven layout designed for marketing and sales professionals. Emphasizes campaign results, metrics, and business impact with a modern visual style.',
'["marketing", "business"]',
'["dynamic", "results-driven", "marketing", "sales", "modern"]',
'{
  "layout": {
    "type": "two-column",
    "columns": [
      {"width": "35%", "sections": ["skills", "awards", "languages"]},
      {"width": "65%", "sections": ["header", "summary", "work", "projects", "education"]}
    ]
  },
  "sections": {
    "header": {"id": "header", "type": "header", "title": "Marketing Profile"},
    "summary": {"id": "summary", "type": "summary", "title": "Professional Summary"},
    "work": {"id": "work", "type": "work", "title": "Experience"},
    "projects": {"id": "projects", "type": "projects", "title": "Key Campaigns"},
    "education": {"id": "education", "type": "education", "title": "Education"},
    "skills": {"id": "skills", "type": "skills", "title": "Marketing Skills"},
    "awards": {"id": "awards", "type": "awards", "title": "Certifications"},
    "languages": {"id": "languages", "type": "languages", "title": "Languages"}
  }
}',
'{"primary": "#ea580c", "accent": "#fff7ed", "font": "inter"}',
NULL,
'{
  "basics": {
    "name": "Emily Chen",
    "label": "VP of Marketing",
    "email": "emily.chen@marketing.com",
    "phone": "+1 (555) 678-9012",
    "summary": "Results-driven marketing executive with 12+ years of experience building and scaling B2B and B2C brands. Proven track record of driving 300%+ growth through integrated marketing strategies. Expert in digital marketing, brand development, and building high-performing teams.",
    "location": {"city": "San Francisco", "region": "CA"}
  },
  "work": [
    {
      "name": "HubSpot",
      "position": "VP of Marketing",
      "startDate": "2020-01",
      "endDate": "Present",
      "summary": "Lead 50+ person marketing team across brand, demand gen, and product marketing. Grew marketing-sourced pipeline by 250% YoY. Launched award-winning brand campaign reaching 100M+ impressions. Manage $25M annual marketing budget."
    },
    {
      "name": "Slack",
      "position": "Senior Director, Growth Marketing",
      "startDate": "2017-03",
      "endDate": "2019-12",
      "summary": "Built and led growth marketing team from 5 to 25 people. Implemented PLG strategies that increased free-to-paid conversion by 40%. Launched referral program generating 500K+ new users."
    },
    {
      "name": "Dropbox",
      "position": "Marketing Manager",
      "startDate": "2014-06",
      "endDate": "2017-02",
      "summary": "Managed digital marketing campaigns across paid, organic, and email channels. Optimized CAC by 35% through data-driven A/B testing. Led localization of marketing for 15 international markets."
    }
  ],
  "education": [
    {
      "institution": "Northwestern University - Kellogg School of Management",
      "area": "Marketing",
      "studyType": "Master of Business Administration (MBA)",
      "startDate": "2012",
      "endDate": "2014"
    },
    {
      "institution": "UCLA",
      "area": "Communications",
      "studyType": "Bachelor of Arts",
      "startDate": "2008",
      "endDate": "2012"
    }
  ],
  "skills": [
    {"name": "Brand Strategy"},
    {"name": "Demand Generation"},
    {"name": "Product Marketing"},
    {"name": "SEO/SEM"},
    {"name": "Marketing Automation"},
    {"name": "Analytics (Google Analytics, Mixpanel)"},
    {"name": "Content Marketing"},
    {"name": "Team Leadership"}
  ],
  "projects": [
    {
      "name": "Make Every Moment Count Campaign",
      "description": "Led award-winning brand campaign reaching 100M+ impressions across TV, digital, and OOH. Campaign won Effie Gold and increased brand awareness by 45%.",
      "startDate": "2022",
      "endDate": "2023"
    },
    {
      "name": "Product-Led Growth Initiative",
      "description": "Designed and implemented PLG strategy that increased free trial signups by 200% and improved activation rates by 60%.",
      "startDate": "2021",
      "endDate": "2022"
    }
  ],
  "languages": [
    {"language": "English", "fluency": "Native"},
    {"language": "Mandarin", "fluency": "Native"},
    {"language": "Spanish", "fluency": "Conversational"}
  ],
  "awards": [
    {"title": "Google Analytics Certified", "date": "2023", "awarder": "Google"},
    {"title": "HubSpot Inbound Marketing Certified", "date": "2022", "awarder": "HubSpot Academy"},
    {"title": "Effie Gold Award", "date": "2023", "awarder": "Effie Worldwide"}
  ],
  "volunteer": [],
  "references": [],
  "publications": []
}',
true);

-- ============================================================================
-- SUMMARY OF INDUSTRY COVERAGE
-- ============================================================================
-- Each industry now has 5 recommended templates:
--
-- Technology (tech):
--   1. Modern Professional
--   2. Minimal ATS
--   3. Tech Innovator
--   4. Executive Suite (for senior roles)
--   5. Marketing Pro (for tech marketing roles)
--
-- Business & Finance (business):
--   1. Modern Professional
--   2. Executive Suite
--   3. Classic Business
--   4. Legal Excellence
--   5. Marketing Pro
--
-- Healthcare (healthcare):
--   1. Healthcare Professional
--   2. Academic Scholar (for research roles)
--   3. Executive Suite (for admin roles)
--   4. Modern Professional
--   5. Minimal ATS
--
-- Creative & Design (creative):
--   1. Creative Portfolio
--   2. Marketing Pro
--   3. Modern Professional
--   4. Tech Innovator (for UX/UI roles)
--   5. Minimal ATS
--
-- Marketing & Sales (marketing):
--   1. Marketing Pro
--   2. Creative Portfolio
--   3. Modern Professional
--   4. Minimal ATS
--   5. Classic Business
--
-- Education (education):
--   1. Academic Scholar
--   2. Modern Professional
--   3. Classic Business
--   4. Healthcare Professional (for medical education)
--   5. Minimal ATS
--
-- Legal (legal):
--   1. Legal Excellence
--   2. Executive Suite
--   3. Classic Business
--   4. Modern Professional
--   5. Minimal ATS
--
-- Other (other):
--   1. Modern Professional
--   2. Minimal ATS
--   3. Classic Business
--   4. Executive Suite
--   5. Academic Scholar
-- ============================================================================
