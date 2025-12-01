-- 5 World-Class Resume Templates for ClayCV
-- Execute this SQL to add new templates to the database

-- Template 1: Executive Suite - Elegant design for C-level executives and senior leaders
INSERT INTO templates (slug, name, description, industry, tags, structure, styles, thumbnail_url, dummy_data, is_premium) VALUES
('executive-suite', 'Executive Suite', 'Sophisticated and elegant layout for C-level executives and senior leaders. Features a refined two-column design with emphasis on leadership achievements.', 
'["executive", "c-suite", "management", "leadership"]', 
'["elegant", "professional", "premium", "sophisticated"]',
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

-- Template 2: Creative Portfolio - Bold design for designers and creative professionals
INSERT INTO templates (slug, name, description, industry, tags, structure, styles, thumbnail_url, dummy_data, is_premium) VALUES
('creative-portfolio', 'Creative Portfolio', 'Bold and visually striking layout designed for creative professionals, designers, and artists. Features a modern asymmetric design with space for showcasing creative work.',
'["design", "creative", "marketing", "advertising", "arts"]',
'["bold", "modern", "creative", "visual", "artistic"]',
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

-- Template 3: Academic Scholar - Structured layout for researchers and academics
INSERT INTO templates (slug, name, description, industry, tags, structure, styles, thumbnail_url, dummy_data, is_premium) VALUES
('academic-scholar', 'Academic Scholar', 'Structured and comprehensive layout designed for academics, researchers, and educators. Emphasizes publications, research, and teaching experience with clear section organization.',
'["academic", "research", "education", "science", "university"]',
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

-- Template 4: Minimal ATS - Clean and optimized for applicant tracking systems
INSERT INTO templates (slug, name, description, industry, tags, structure, styles, thumbnail_url, dummy_data, is_premium) VALUES
('minimal-ats', 'Minimal ATS', 'Clean, simple, and highly readable layout optimized for Applicant Tracking Systems (ATS). Features a single-column design with clear section headers and standard formatting that parses perfectly.',
'["tech", "corporate", "engineering", "general"]',
'["minimal", "ats-friendly", "clean", "simple", "optimized"]',
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

-- Template 5: Healthcare Professional - Professional layout for medical practitioners
INSERT INTO templates (slug, name, description, industry, tags, structure, styles, thumbnail_url, dummy_data, is_premium) VALUES
('healthcare-pro', 'Healthcare Professional', 'Professional and trustworthy layout designed for doctors, nurses, and healthcare professionals. Features clear organization of credentials, clinical experience, and certifications.',
'["healthcare", "medical", "nursing", "clinical", "hospital"]',
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
    },
    {
      "organization": "Doctors Without Borders",
      "position": "Mission Physician",
      "startDate": "2022",
      "endDate": "2022",
      "summary": "Served 3-month mission in South Sudan providing emergency medical care during humanitarian crisis."
    }
  ],
  "projects": [],
  "references": [],
  "publications": []
}',
true);
