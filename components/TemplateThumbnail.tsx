"use client";

import React from "react";
import { Template, ResumeContent } from "@/types/resume";

interface TemplateThumbnailProps {
  template: Template;
  className?: string;
}

const DEFAULT_DUMMY_DATA: ResumeContent = {
  basics: {
    name: "Alex Chen",
    label: "Software Engineer",
    email: "alex@email.com",
    phone: "(555) 123-4567",
    summary: "Experienced professional with expertise in delivering results.",
    location: { city: "San Francisco", region: "CA" }
  },
  work: [
    { name: "Tech Corp", position: "Senior Developer", startDate: "2021", endDate: "Present", summary: "Leading team of developers." },
    { name: "Startup Inc", position: "Developer", startDate: "2018", endDate: "2021", summary: "Built core features." }
  ],
  education: [
    { institution: "University", studyType: "Bachelor", area: "Computer Science", startDate: "2014", endDate: "2018" }
  ],
  skills: [
    { name: "JavaScript" }, { name: "React" }, { name: "Python" }, { name: "Node.js" },
    { name: "TypeScript" }, { name: "SQL" }
  ],
  languages: [
    { language: "English", fluency: "Native" },
    { language: "Spanish", fluency: "Professional" }
  ],
  projects: [
    { name: "E-commerce App", description: "Full-stack shopping platform" }
  ],
  awards: [
    { title: "Best Employee", date: "2023", awarder: "Tech Corp" }
  ],
  volunteer: [],
  references: [],
  publications: []
};

export default function TemplateThumbnail({ template, className = "" }: TemplateThumbnailProps) {
  const data = template.dummy_data || DEFAULT_DUMMY_DATA;
  const styles = template.styles;
  const structure = template.structure;
  
  const isTwoColumn = structure.layout.type === "two-column";
  const columns = structure.layout.columns;

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "header":
        return (
          <div key={sectionId} className="mb-2">
            <div 
              className="font-bold text-[8px] leading-tight truncate"
              style={{ color: styles.primary }}
            >
              {data.basics?.name || "Your Name"}
            </div>
            <div className="text-[5px] text-gray-500 truncate">
              {data.basics?.label || "Professional Title"}
            </div>
            <div className="flex gap-1 mt-0.5">
              <div className="h-0.5 w-6 bg-gray-300 rounded-full"></div>
              <div className="h-0.5 w-4 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        );
      
      case "summary":
        return (
          <div key={sectionId} className="mb-1.5">
            <div className="space-y-0.5">
              <div className="h-0.5 w-full bg-gray-200 rounded-full"></div>
              <div className="h-0.5 w-11/12 bg-gray-200 rounded-full"></div>
              <div className="h-0.5 w-4/5 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        );
      
      case "work":
      case "experience":
        return (
          <div key={sectionId} className="mb-1.5">
            <div 
              className="text-[5px] font-semibold mb-0.5 uppercase tracking-wide"
              style={{ color: styles.primary }}
            >
              Experience
            </div>
            {(data.work || []).slice(0, 2).map((job, i) => (
              <div key={i} className="mb-1">
                <div className="flex justify-between items-center">
                  <div className="h-0.5 w-8 bg-gray-700 rounded-full"></div>
                  <div className="h-0.5 w-4 bg-gray-300 rounded-full"></div>
                </div>
                <div className="h-0.5 w-6 mt-0.5 rounded-full" style={{ backgroundColor: styles.primary + "40" }}></div>
                <div className="space-y-0.5 mt-0.5">
                  <div className="h-0.5 w-full bg-gray-200 rounded-full"></div>
                  <div className="h-0.5 w-3/4 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case "education":
        return (
          <div key={sectionId} className="mb-1.5">
            <div 
              className="text-[5px] font-semibold mb-0.5 uppercase tracking-wide"
              style={{ color: styles.primary }}
            >
              Education
            </div>
            {(data.education || []).slice(0, 1).map((edu, i) => (
              <div key={i} className="mb-1">
                <div className="flex justify-between items-center">
                  <div className="h-0.5 w-7 bg-gray-700 rounded-full"></div>
                  <div className="h-0.5 w-3 bg-gray-300 rounded-full"></div>
                </div>
                <div className="h-0.5 w-5 mt-0.5 rounded-full" style={{ backgroundColor: styles.primary + "40" }}></div>
              </div>
            ))}
          </div>
        );
      
      case "skills":
        return (
          <div key={sectionId} className="mb-1.5">
            <div 
              className="text-[5px] font-semibold mb-0.5 uppercase tracking-wide"
              style={{ color: styles.primary }}
            >
              Skills
            </div>
            <div className="flex flex-wrap gap-0.5">
              {(data.skills || []).slice(0, 6).map((skill, i) => (
                <div 
                  key={i} 
                  className="h-1.5 rounded-sm text-[3px] px-0.5 flex items-center"
                  style={{ backgroundColor: styles.accent || "#e5e7eb" }}
                >
                  <span className="truncate max-w-[20px]" style={{ color: styles.primary }}>
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "projects":
        return (
          <div key={sectionId} className="mb-1.5">
            <div 
              className="text-[5px] font-semibold mb-0.5 uppercase tracking-wide"
              style={{ color: styles.primary }}
            >
              Projects
            </div>
            <div className="mb-1">
              <div className="h-0.5 w-6 bg-gray-700 rounded-full"></div>
              <div className="space-y-0.5 mt-0.5">
                <div className="h-0.5 w-full bg-gray-200 rounded-full"></div>
                <div className="h-0.5 w-2/3 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        );
      
      case "languages":
        return (
          <div key={sectionId} className="mb-1.5">
            <div 
              className="text-[5px] font-semibold mb-0.5 uppercase tracking-wide"
              style={{ color: styles.primary }}
            >
              Languages
            </div>
            <div className="space-y-0.5">
              {(data.languages || []).slice(0, 2).map((lang, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-0.5 w-5 bg-gray-600 rounded-full"></div>
                  <div className="h-0.5 w-3 bg-gray-300 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "awards":
        return (
          <div key={sectionId} className="mb-1.5">
            <div 
              className="text-[5px] font-semibold mb-0.5 uppercase tracking-wide"
              style={{ color: styles.primary }}
            >
              Awards
            </div>
            <div className="space-y-0.5">
              <div className="h-0.5 w-7 bg-gray-600 rounded-full"></div>
              <div className="h-0.5 w-4 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        );
      
      case "volunteer":
        return (
          <div key={sectionId} className="mb-1.5">
            <div 
              className="text-[5px] font-semibold mb-0.5 uppercase tracking-wide"
              style={{ color: styles.primary }}
            >
              Volunteer
            </div>
            <div className="h-0.5 w-6 bg-gray-600 rounded-full"></div>
          </div>
        );

      case "contact":
        return (
          <div key={sectionId} className="mb-1.5">
            <div 
              className="text-[5px] font-semibold mb-0.5 uppercase tracking-wide"
              style={{ color: styles.primary }}
            >
              Contact
            </div>
            <div className="space-y-0.5">
              <div className="h-0.5 w-8 bg-gray-400 rounded-full"></div>
              <div className="h-0.5 w-6 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        );

      case "references":
        return (
          <div key={sectionId} className="mb-1.5">
            <div 
              className="text-[5px] font-semibold mb-0.5 uppercase tracking-wide"
              style={{ color: styles.primary }}
            >
              References
            </div>
            <div className="h-0.5 w-10 bg-gray-300 rounded-full"></div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white shadow-lg overflow-hidden ${className}`}>
      <div 
        className="w-full h-full p-2"
        style={{ 
          fontFamily: styles.font === "georgia" ? "Georgia, serif" : "Inter, sans-serif",
        }}
      >
        {isTwoColumn ? (
          <div className="flex gap-1.5 h-full">
            {columns.map((col, colIndex) => {
              const widthPercent = parseInt(col.width) || (colIndex === 0 ? 35 : 65);
              const isLeftColumn = colIndex === 0;
              
              return (
                <div 
                  key={colIndex}
                  className={`${isLeftColumn ? "pr-1" : ""}`}
                  style={{ 
                    width: `${widthPercent}%`,
                    backgroundColor: isLeftColumn ? (styles.accent || "#f3f4f6") : "transparent",
                    padding: isLeftColumn ? "4px" : "0",
                    borderRadius: isLeftColumn ? "2px" : "0"
                  }}
                >
                  {col.sections.map(sectionId => renderSection(sectionId))}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {columns[0]?.sections.map(sectionId => renderSection(sectionId))}
          </div>
        )}
      </div>
    </div>
  );
}
