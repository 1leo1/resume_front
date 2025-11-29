"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Download, Eye, Palette, Plus, Trash2, 
  ChevronDown, ChevronUp, GripVertical, Save, Share2,
  Briefcase, GraduationCap, Award, Code, User, Mail, Phone, MapPin
} from "lucide-react";
import Link from "next/link";

const templates = [
  { id: 1, name: "Modern", color: "blue" },
  { id: 2, name: "Professional", color: "gray" },
  { id: 3, name: "Creative", color: "purple" },
  { id: 4, name: "Minimal", color: "slate" },
  { id: 5, name: "Executive", color: "emerald" },
];

const sampleSkills = ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS", "Docker", "Git"];

export default function EditorPage() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template");
  const [selectedTemplate, setSelectedTemplate] = useState(templateId ? parseInt(templateId) : 1);
  const [activeSection, setActiveSection] = useState<string | null>("personal");
  const [showTemplates, setShowTemplates] = useState(false);

  const { resumeData, updateField, addExperience, addEducation, addSkill } = useResumeStore();

  return (
    <div className="flex h-screen flex-col bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-gray-950 dark:border-gray-800 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
          </Link>
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
          <input
            type="text"
            defaultValue="My Resume"
            className="text-lg font-semibold bg-transparent border-none outline-none focus:ring-0 w-40"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            <Save className="w-4 h-4" />
            Save
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Editor */}
        <div className="w-[420px] overflow-y-auto border-r bg-white dark:bg-gray-950 dark:border-gray-800 shrink-0">
          {/* Template Selector */}
          <div className="p-4 border-b dark:border-gray-800">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Template: {templates.find(t => t.id === selectedTemplate)?.name}</span>
              </div>
              {showTemplates ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            
            <AnimatePresence>
              {showTemplates && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-5 gap-2 pt-4">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => {
                          setSelectedTemplate(template.id);
                          setShowTemplates(false);
                        }}
                        className={`aspect-[3/4] rounded-lg border-2 transition-all ${
                          selectedTemplate === template.id
                            ? "border-blue-600 ring-2 ring-blue-600/20"
                            : "border-gray-200 hover:border-gray-300 dark:border-gray-700"
                        }`}
                      >
                        <div className={`w-full h-full rounded-md bg-gradient-to-b from-${template.color}-100 to-${template.color}-50 dark:from-${template.color}-900/20 dark:to-${template.color}-800/10`} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sections */}
          <div className="divide-y dark:divide-gray-800">
            {/* Personal Info Section */}
            <SectionAccordion
              title="Personal Information"
              icon={User}
              isOpen={activeSection === "personal"}
              onToggle={() => setActiveSection(activeSection === "personal" ? null : "personal")}
            >
              <div className="space-y-4">
                <InputField
                  label="Full Name"
                  icon={User}
                  value={resumeData.name}
                  onChange={(value) => updateField("name", value)}
                  placeholder="John Doe"
                />
                <InputField
                  label="Email"
                  icon={Mail}
                  type="email"
                  value={resumeData.email}
                  onChange={(value) => updateField("email", value)}
                  placeholder="john@example.com"
                />
                <InputField
                  label="Phone"
                  icon={Phone}
                  value={resumeData.phone}
                  onChange={(value) => updateField("phone", value)}
                  placeholder="+1 (555) 000-0000"
                />
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                    Professional Summary
                  </label>
                  <div className="relative">
                    <textarea
                      className="w-full rounded-lg border border-gray-200 p-3 text-sm min-h-[100px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:bg-gray-900 dark:border-gray-700"
                      value={resumeData.summary}
                      onChange={(e) => updateField("summary", e.target.value)}
                      placeholder="A brief summary of your professional background..."
                    />
                    <EnhanceButton
                      text={resumeData.summary}
                      onEnhanced={(text) => updateField("summary", text)}
                    />
                  </div>
                </div>
              </div>
            </SectionAccordion>

            {/* Experience Section */}
            <SectionAccordion
              title="Work Experience"
              icon={Briefcase}
              isOpen={activeSection === "experience"}
              onToggle={() => setActiveSection(activeSection === "experience" ? null : "experience")}
            >
              <div className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <ExperienceCard key={index} index={index} />
                ))}
                <button
                  onClick={addExperience}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-gray-200 text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors dark:border-gray-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Experience
                </button>
              </div>
            </SectionAccordion>

            {/* Education Section */}
            <SectionAccordion
              title="Education"
              icon={GraduationCap}
              isOpen={activeSection === "education"}
              onToggle={() => setActiveSection(activeSection === "education" ? null : "education")}
            >
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <EducationCard key={index} index={index} />
                ))}
                <button
                  onClick={addEducation}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-gray-200 text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors dark:border-gray-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Education
                </button>
              </div>
            </SectionAccordion>

            {/* Skills Section */}
            <SectionAccordion
              title="Skills"
              icon={Code}
              isOpen={activeSection === "skills"}
              onToggle={() => setActiveSection(activeSection === "skills" ? null : "skills")}
            >
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      {skill.name}
                      <button className="hover:text-blue-900 dark:hover:text-blue-300">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a skill..."
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:bg-gray-900 dark:border-gray-700"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value) {
                        addSkill();
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Suggested skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {sampleSkills.map((skill) => (
                      <button
                        key={skill}
                        className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-gray-400"
                      >
                        + {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SectionAccordion>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-100 dark:bg-gray-900">
          <div className="mx-auto max-w-[210mm]">
            <ResumePreview templateId={selectedTemplate} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionAccordion({ 
  title, 
  icon: Icon, 
  isOpen, 
  onToggle, 
  children 
}: { 
  title: string; 
  icon: any; 
  isOpen: boolean; 
  onToggle: () => void; 
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
            <Icon className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-medium">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InputField({ 
  label, 
  icon: Icon, 
  value, 
  onChange, 
  placeholder,
  type = "text"
}: {
  label: string;
  icon: any;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type={type}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:bg-gray-900 dark:border-gray-700"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function ExperienceCard({ index }: { index: number }) {
  const { resumeData, updateField } = useResumeStore();
  const exp = resumeData.experience[index];

  const updateExperience = (field: string, value: string) => {
    const newExp = [...resumeData.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    updateField("experience", newExp);
  };

  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3">
      <div className="flex items-center gap-2">
        <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
        <input
          type="text"
          className="flex-1 font-medium bg-transparent border-none outline-none text-sm"
          placeholder="Job Title"
          value={exp.position}
          onChange={(e) => updateExperience("position", e.target.value)}
        />
        <button className="text-gray-400 hover:text-red-500 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <input
        type="text"
        className="w-full text-sm text-gray-600 bg-transparent border-none outline-none dark:text-gray-400"
        placeholder="Company Name"
        value={exp.company}
        onChange={(e) => updateExperience("company", e.target.value)}
      />
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 text-xs text-gray-500 bg-transparent border-none outline-none"
          placeholder="Start Date"
          value={exp.start_date}
          onChange={(e) => updateExperience("start_date", e.target.value)}
        />
        <span className="text-gray-400">-</span>
        <input
          type="text"
          className="flex-1 text-xs text-gray-500 bg-transparent border-none outline-none"
          placeholder="End Date"
          value={exp.end_date}
          onChange={(e) => updateExperience("end_date", e.target.value)}
        />
      </div>
      <div className="relative">
        <textarea
          className="w-full text-sm rounded-lg border border-gray-200 p-2 min-h-[60px] focus:border-blue-500 outline-none dark:bg-gray-900 dark:border-gray-700"
          placeholder="Describe your responsibilities..."
          value={exp.description}
          onChange={(e) => updateExperience("description", e.target.value)}
        />
        <EnhanceButton
          text={exp.description}
          onEnhanced={(text) => updateExperience("description", text)}
          small
        />
      </div>
    </div>
  );
}

function EducationCard({ index }: { index: number }) {
  const { resumeData, updateField } = useResumeStore();
  const edu = resumeData.education[index];

  const updateEducation = (field: string, value: string) => {
    const newEdu = [...resumeData.education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    updateField("education", newEdu);
  };

  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3">
      <div className="flex items-center gap-2">
        <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
        <input
          type="text"
          className="flex-1 font-medium bg-transparent border-none outline-none text-sm"
          placeholder="Degree"
          value={edu.degree}
          onChange={(e) => updateEducation("degree", e.target.value)}
        />
        <button className="text-gray-400 hover:text-red-500 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <input
        type="text"
        className="w-full text-sm text-gray-600 bg-transparent border-none outline-none dark:text-gray-400"
        placeholder="Institution Name"
        value={edu.institution}
        onChange={(e) => updateEducation("institution", e.target.value)}
      />
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 text-xs text-gray-500 bg-transparent border-none outline-none"
          placeholder="Start Date"
          value={edu.start_date}
          onChange={(e) => updateEducation("start_date", e.target.value)}
        />
        <span className="text-gray-400">-</span>
        <input
          type="text"
          className="flex-1 text-xs text-gray-500 bg-transparent border-none outline-none"
          placeholder="End Date"
          value={edu.end_date}
          onChange={(e) => updateEducation("end_date", e.target.value)}
        />
      </div>
    </div>
  );
}

function EnhanceButton({ text, onEnhanced, small = false }: { text: string; onEnhanced: (t: string) => void; small?: boolean }) {
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    if (!text) return;
    setLoading(true);
    
    setTimeout(() => {
      const enhanced = text + " (Enhanced with AI suggestions for better impact and clarity.)";
      onEnhanced(enhanced);
      setLoading(false);
    }, 1500);
  };

  return (
    <button
      onClick={handleEnhance}
      disabled={loading || !text}
      className={`absolute right-2 flex items-center gap-1 text-purple-600 hover:text-purple-700 disabled:opacity-50 transition-colors ${
        small ? "bottom-2 text-xs" : "top-2 text-xs"
      }`}
    >
      <Sparkles className={small ? "w-3 h-3" : "w-3.5 h-3.5"} />
      {loading ? "Enhancing..." : "Enhance"}
    </button>
  );
}

function ResumePreview({ templateId }: { templateId: number }) {
  const { resumeData } = useResumeStore();

  const templateColors: Record<number, { primary: string; accent: string }> = {
    1: { primary: "blue-600", accent: "blue-100" },
    2: { primary: "gray-800", accent: "gray-100" },
    3: { primary: "purple-600", accent: "purple-100" },
    4: { primary: "slate-700", accent: "slate-100" },
    5: { primary: "emerald-600", accent: "emerald-100" },
  };

  const colors = templateColors[templateId] || templateColors[1];

  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden print:shadow-none">
      {/* Header */}
      <div className={`bg-${colors.primary} text-white p-8`}>
        <h1 className="text-3xl font-bold mb-2">
          {resumeData.name || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm opacity-90">
          {resumeData.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {resumeData.email}
            </span>
          )}
          {resumeData.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {resumeData.phone}
            </span>
          )}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Summary */}
        {resumeData.summary && (
          <section>
            <h2 className={`text-lg font-bold text-${colors.primary} border-b-2 border-${colors.accent} pb-2 mb-3`}>
              Professional Summary
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">{resumeData.summary}</p>
          </section>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <section>
            <h2 className={`text-lg font-bold text-${colors.primary} border-b-2 border-${colors.accent} pb-2 mb-3`}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{exp.position || "Position"}</h3>
                      <p className="text-gray-600 text-sm">{exp.company || "Company"}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {exp.start_date} - {exp.end_date || "Present"}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <section>
            <h2 className={`text-lg font-bold text-${colors.primary} border-b-2 border-${colors.accent} pb-2 mb-3`}>
              Education
            </h2>
            <div className="space-y-3">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{edu.degree || "Degree"}</h3>
                    <p className="text-gray-600 text-sm">{edu.institution || "Institution"}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {edu.start_date} - {edu.end_date}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <section>
            <h2 className={`text-lg font-bold text-${colors.primary} border-b-2 border-${colors.accent} pb-2 mb-3`}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full bg-${colors.accent} text-${colors.primary} text-sm`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!resumeData.name && !resumeData.summary && resumeData.experience.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Start filling in your details</p>
            <p className="text-sm">Your resume preview will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
