"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import {
  Download, Palette, Share2, FileText, Layout, Briefcase,
  Undo2, Redo2, Eye, History, ChevronRight, X, Check, PlusCircle, 
  Loader2, Save, ZoomIn, ZoomOut, Sparkles, Cloud, CloudOff,
  Menu, ChevronLeft, Settings, Copy, ExternalLink, Printer
} from "lucide-react";
import Link from "next/link";
import ResumeRenderer from "@/components/renderer/ResumeRenderer";
import BlueprintSelector from "@/components/editor/BlueprintSelector";
import SectionManager from "@/components/editor/SectionManager";
import AddSectionModal from "@/components/AddSectionModal";
import { getFinalSections } from "@/utils/resumeAssembler";
import { JobBlueprint } from "@/types/blueprint";

const DEFAULT_TEMPLATE = {
  id: 1,
  name: "Modern Professional",
  structure: {
    layout: {
      type: "two-column" as const,
      columns: [
        { width: "35%", sections: ["skills", "education", "languages"] },
        { width: "65%", sections: ["header", "summary", "work", "projects"] }
      ]
    },
    sections: {}
  },
  styles: {
    primary: "#2563eb",
    accent: "#dbeafe",
    font: "inter"
  }
};

const DEFAULT_TEMPLATES = [
  DEFAULT_TEMPLATE,
  {
    id: 2,
    name: "Classic Simple",
    structure: {
      layout: {
        type: "single-column" as const,
        columns: [
          { width: "100%", sections: ["header", "summary", "work", "education", "skills"] }
        ]
      },
      sections: {}
    },
    styles: {
      primary: "#1f2937",
      accent: "#f3f4f6",
      font: "georgia"
    }
  },
  {
    id: 3,
    name: "Creative Bold",
    structure: {
      layout: {
        type: "two-column" as const,
        columns: [
          { width: "30%", sections: ["skills", "languages", "awards"] },
          { width: "70%", sections: ["header", "summary", "work", "education", "projects"] }
        ]
      },
      sections: {}
    },
    styles: {
      primary: "#7c3aed",
      accent: "#ede9fe",
      font: "inter"
    }
  }
];

const DEFAULT_RESUME_DATA = {
  basics: {
    name: "Alex Chen",
    label: "Senior Software Engineer",
    email: "alex.chen@example.com",
    phone: "+1 (555) 123-4567",
    summary: "Full-stack developer with 5+ years of experience building scalable web applications. Passionate about clean code and user experience.",
    location: { city: "San Francisco, CA" }
  },
  work: [
    {
      name: "TechCorp Inc.",
      position: "Senior Developer",
      startDate: "2021-03",
      endDate: "Present",
      summary: "Leading the frontend team in migrating to Next.js. Improved page load times by 40% and implemented CI/CD pipelines."
    },
    {
      name: "StartupXYZ",
      position: "Software Engineer",
      startDate: "2018-06",
      endDate: "2021-02",
      summary: "Developed core features for the main product. Built RESTful APIs and integrated third-party services."
    }
  ],
  education: [
    {
      institution: "University of Technology",
      studyType: "Bachelor",
      area: "Computer Science",
      startDate: "2014-09",
      endDate: "2018-05"
    }
  ],
  skills: [
    { name: "JavaScript" },
    { name: "TypeScript" },
    { name: "React" },
    { name: "Next.js" },
    { name: "Node.js" },
    { name: "Python" },
    { name: "AWS" },
    { name: "Docker" }
  ],
  languages: [
    { language: "English", fluency: "Native" },
    { language: "Spanish", fluency: "Intermediate" }
  ],
  projects: [
    {
      name: "Open Source CLI Tool",
      description: "Built a CLI tool for automating development workflows. 500+ GitHub stars.",
      url: "github.com/alexchen/cli-tool"
    }
  ],
  awards: [],
  volunteer: [],
  references: [],
  publications: []
};

function EditorContent() {
  const [blueprints, setBlueprints] = useState<JobBlueprint[]>([]);
  const [selectedBlueprint, setSelectedBlueprint] = useState<JobBlueprint | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0.75);
  const [documentName, setDocumentName] = useState("My Resume");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const {
    resumeData,
    setResumeData,
    design,
    setDesign,
    resumeId,
    setResumeId,
    setTemplate,
    sectionConfig,
    setSectionConfig,
    reorderSections,
    toggleSectionVisibility,
    renameSection
  } = useResumeStore();

  const searchParams = useSearchParams();
  const templateIdParam = searchParams.get("template");

  const [templates, setTemplates] = useState<any[]>([]);
  const [activeDrawer, setActiveDrawer] = useState<"templates" | "design" | "history" | "sections" | "blueprints" | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);

  const toggleDrawer = (drawer: "templates" | "design" | "history" | "sections" | "blueprints") => {
    setActiveDrawer(activeDrawer === drawer ? null : drawer);
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch("/api/templates/");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setTemplates(data);
            const initialTemplate = templateIdParam
              ? data.find((t: any) => t.id === parseInt(templateIdParam))
              : data[0];
            const templateToUse = initialTemplate || data[0];
            setSelectedTemplate(templateToUse);
            setTemplate(templateToUse);

            if (templateToUse.dummy_data && (!resumeData || Object.keys(resumeData).length === 0 || !resumeData.basics?.name)) {
              setResumeData(templateToUse.dummy_data);
            }
            return;
          }
        }
        throw new Error("No templates from API");
      } catch (error) {
        console.log("Using default templates");
        setTemplates(DEFAULT_TEMPLATES);
        setSelectedTemplate(DEFAULT_TEMPLATE);
        setTemplate(DEFAULT_TEMPLATE as any);
        if (!resumeData || Object.keys(resumeData).length === 0 || !resumeData.basics?.name) {
          setResumeData(DEFAULT_RESUME_DATA as any);
        }
      }
    };
    fetchTemplates();
  }, [templateIdParam]);

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setTemplate(template);
  };

  useEffect(() => {
    const fetchBlueprints = async () => {
      try {
        const res = await fetch("/api/blueprints/");
        if (res.ok) {
          const data = await res.json();
          setBlueprints(data);

          const industryParam = searchParams.get("industry");
          if (data.length > 0) {
            let initialBlueprint = data[0];
            if (industryParam) {
              const match = data.find((bp: JobBlueprint) =>
                bp.id.toLowerCase().includes(industryParam.toLowerCase()) ||
                bp.label.toLowerCase().includes(industryParam.toLowerCase())
              );
              if (match) initialBlueprint = match;
            }
            setSelectedBlueprint(initialBlueprint);
          }
        }
      } catch (error) {
        console.error("Failed to fetch blueprints", error);
      }
    };
    fetchBlueprints();
  }, [searchParams]);

  const handleBlueprintSelect = (bp: JobBlueprint) => {
    setSelectedBlueprint(bp);
  };

  const handleContentChange = (sectionId: string, data: any) => {
    setResumeData({
      ...resumeData,
      [sectionId]: data
    });
  };

  const currentBlueprint = selectedBlueprint || {
    id: 'standard',
    label: 'Standard',
    default_sections: ['header', 'summary', 'work', 'education', 'skills', 'projects'],
    section_overrides: {}
  };

  const finalSections = getFinalSections(currentBlueprint, sectionConfig, resumeData);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));

  const handlePrint = () => {
    window.print();
  };

  const colorOptions = [
    { name: 'Blue', value: '#2563eb', class: 'bg-blue-600' },
    { name: 'Indigo', value: '#4f46e5', class: 'bg-indigo-600' },
    { name: 'Purple', value: '#7c3aed', class: 'bg-purple-600' },
    { name: 'Pink', value: '#db2777', class: 'bg-pink-600' },
    { name: 'Red', value: '#dc2626', class: 'bg-red-600' },
    { name: 'Orange', value: '#ea580c', class: 'bg-orange-600' },
    { name: 'Teal', value: '#0d9488', class: 'bg-teal-600' },
    { name: 'Green', value: '#16a34a', class: 'bg-green-600' },
    { name: 'Gray', value: '#4b5563', class: 'bg-gray-600' },
    { name: 'Slate', value: '#1e293b', class: 'bg-slate-800' },
  ];

  const fontOptions = [
    { name: 'Inter', value: 'inter', sample: 'Modern & Clean' },
    { name: 'Georgia', value: 'georgia', sample: 'Classic Serif' },
    { name: 'Roboto', value: 'roboto', sample: 'Professional' },
    { name: 'Playfair', value: 'playfair', sample: 'Elegant' },
  ];

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Modern Header */}
      <header className="h-14 flex items-center justify-between px-4 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shrink-0 z-30">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 hidden sm:block">
              ClayCV
            </span>
          </Link>
          
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1" />
          
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="text-sm font-medium bg-transparent border-none outline-none focus:ring-0 text-gray-900 dark:text-white w-32 sm:w-auto"
            />
            {isSaving ? (
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span className="hidden sm:inline">Saving...</span>
              </div>
            ) : lastSaved ? (
              <div className="flex items-center gap-1.5 text-xs text-green-600">
                <Cloud className="w-3 h-3" />
                <span className="hidden sm:inline">Saved</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <CloudOff className="w-3 h-3" />
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreviewModal(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-sm shadow-blue-500/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <motion.div 
          className="bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col shrink-0 z-20"
          animate={{ width: sidebarCollapsed ? 60 : 240 }}
          transition={{ duration: 0.2 }}
        >
          {/* Sidebar Header */}
          <div className={`p-4 border-b border-gray-100 dark:border-gray-800 flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!sidebarCollapsed && (
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">Tools</h2>
              </div>
            )}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-500"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Sidebar Actions */}
          <div className="flex-1 overflow-y-auto py-2">
            <SidebarAction
              icon={PlusCircle}
              label="Add Section"
              collapsed={sidebarCollapsed}
              onClick={() => setShowAddSectionModal(true)}
              color="blue"
            />
            
            <SidebarAction
              icon={Layout}
              label="Templates"
              collapsed={sidebarCollapsed}
              onClick={() => toggleDrawer("templates")}
              isActive={activeDrawer === "templates"}
              color="purple"
            />
            
            <SidebarAction
              icon={Palette}
              label="Design"
              collapsed={sidebarCollapsed}
              onClick={() => toggleDrawer("design")}
              isActive={activeDrawer === "design"}
              color="pink"
            />
            
            <SidebarAction
              icon={Eye}
              label="Preview"
              collapsed={sidebarCollapsed}
              onClick={() => setShowPreviewModal(true)}
              color="green"
            />
            
            <SidebarAction
              icon={History}
              label="History"
              collapsed={sidebarCollapsed}
              onClick={() => toggleDrawer("history")}
              isActive={activeDrawer === "history"}
              color="orange"
            />

            <div className="my-3 mx-3 border-t border-gray-100 dark:border-gray-800" />

            <SidebarAction
              icon={Share2}
              label="Share"
              collapsed={sidebarCollapsed}
              onClick={() => {}}
              color="indigo"
            />
            
            <SidebarAction
              icon={Sparkles}
              label="AI Enhance"
              collapsed={sidebarCollapsed}
              onClick={() => {}}
              color="cyan"
            />
          </div>
        </motion.div>

        {/* Drawer Panel */}
        <AnimatePresence mode="wait">
          {activeDrawer && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col z-10"
            >
              <div className="w-80 h-full flex flex-col">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between shrink-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white capitalize">{activeDrawer}</h3>
                  <button 
                    onClick={() => setActiveDrawer(null)} 
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {activeDrawer === "blueprints" && (
                    <BlueprintSelector
                      blueprints={blueprints}
                      selectedBlueprintId={selectedBlueprint?.id || ''}
                      onSelect={handleBlueprintSelect}
                    />
                  )}

                  {activeDrawer === "sections" && (
                    <SectionManager
                      sections={finalSections}
                      onReorder={reorderSections}
                      onToggle={toggleSectionVisibility}
                      onRename={renameSection}
                    />
                  )}

                  {activeDrawer === "templates" && (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-500">Choose a template to change the layout of your resume.</p>
                      <div className="grid grid-cols-2 gap-3">
                        {templates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => handleTemplateSelect(template)}
                            className={`group relative aspect-[210/297] w-full overflow-hidden rounded-xl border-2 transition-all ${
                              selectedTemplate?.id === template.id
                                ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg"
                                : "border-gray-200 hover:border-blue-300 dark:border-gray-700 hover:shadow-md"
                            }`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                              <Layout className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                            </div>
                            {selectedTemplate?.id === template.id && (
                              <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-2 text-xs font-medium">
                              {template.name}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeDrawer === "design" && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Theme Color</h4>
                        <div className="grid grid-cols-5 gap-2">
                          {colorOptions.map((color) => (
                            <button
                              key={color.value}
                              onClick={() => setDesign({ ...design, theme: { ...design.theme, primary: color.value } })}
                              className={`w-10 h-10 rounded-xl ${color.class} transition-all hover:scale-110 ${
                                design.theme.primary === color.value 
                                  ? 'ring-2 ring-offset-2 ring-gray-900 dark:ring-white scale-110' 
                                  : ''
                              }`}
                              title={color.name}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Font Style</h4>
                        <div className="space-y-2">
                          {fontOptions.map((font) => (
                            <button
                              key={font.value}
                              onClick={() => setDesign({ ...design, theme: { ...design.theme, font: font.value } })}
                              className={`w-full p-3 text-left rounded-xl border-2 transition-all ${
                                design.theme.font === font.value
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                              }`}
                            >
                              <div className="font-medium text-gray-900 dark:text-white">{font.name}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{font.sample}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Layout Style</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setDesign({ ...design, layout: 'single-column' })}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              design.layout === 'single-column'
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            <div className="w-full aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-lg flex flex-col gap-1 p-2">
                              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded" />
                              <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                              <div className="flex-1 bg-gray-300 dark:bg-gray-600 rounded mt-1" />
                            </div>
                            <div className="text-xs font-medium mt-2 text-center">Single Column</div>
                          </button>
                          <button
                            onClick={() => setDesign({ ...design, layout: 'two-column' })}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              design.layout === 'two-column'
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            <div className="w-full aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-lg flex gap-1 p-2">
                              <div className="w-1/3 bg-gray-300 dark:bg-gray-600 rounded" />
                              <div className="flex-1 flex flex-col gap-1">
                                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded" />
                                <div className="flex-1 bg-gray-300 dark:bg-gray-600 rounded" />
                              </div>
                            </div>
                            <div className="text-xs font-medium mt-2 text-center">Two Column</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDrawer === "history" && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                        <History className="w-8 h-8 text-orange-600" />
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Version History</h4>
                      <p className="text-sm text-gray-500">Your changes are automatically saved. Version history coming soon.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Preview Area */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-900 flex flex-col overflow-hidden">
          {/* Preview Controls */}
          <div className="h-12 px-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Live Preview</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                disabled={zoomLevel <= 0.5}
              >
                <ZoomOut className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400 w-14 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                disabled={zoomLevel >= 1.5}
              >
                <ZoomIn className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Resume Preview */}
          <div 
            className="flex-1 overflow-auto p-6 flex justify-center"
            onClick={() => activeDrawer && setActiveDrawer(null)}
          >
            {selectedTemplate ? (
              <div 
                className="origin-top transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <div className="bg-white shadow-2xl rounded-sm" style={{ width: '210mm', minHeight: '297mm' }}>
                  <ResumeRenderer
                    content={resumeData}
                    structure={selectedTemplate.structure}
                    styles={design.theme}
                    sectionConfig={sectionConfig}
                    isInteractive={true}
                    onReorder={reorderSections}
                    onContentChange={handleContentChange}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-500">Loading template...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Section Modal */}
        <AddSectionModal
          isOpen={showAddSectionModal}
          onClose={() => setShowAddSectionModal(false)}
        />

        {/* Preview Modal (Full Screen) */}
        <AnimatePresence>
          {showPreviewModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-8"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-lg font-medium">Full Preview</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                    >
                      <Printer className="w-4 h-4" />
                      Print / Save PDF
                    </button>
                    <button
                      onClick={() => setShowPreviewModal(false)}
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto flex justify-center">
                  {selectedTemplate && (
                    <div className="bg-white shadow-2xl" style={{ width: '210mm', minHeight: '297mm' }}>
                      <ResumeRenderer
                        content={resumeData}
                        structure={selectedTemplate.structure}
                        styles={design.theme}
                        sectionConfig={sectionConfig}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SidebarAction({ 
  icon: Icon, 
  label, 
  collapsed, 
  onClick, 
  isActive = false,
  color = 'gray'
}: { 
  icon: any; 
  label: string; 
  collapsed: boolean; 
  onClick: () => void;
  isActive?: boolean;
  color?: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    pink: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
    green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    cyan: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
    gray: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  };

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 mx-auto transition-all relative group ${
        collapsed ? 'justify-center' : ''
      } ${isActive ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
      title={collapsed ? label : undefined}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full" />
      )}
      <div className={`p-2 rounded-xl ${colorClasses[color]} transition-transform group-hover:scale-105`}>
        <Icon className="w-4 h-4" />
      </div>
      {!collapsed && (
        <span className={`text-sm font-medium ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
          {label}
        </span>
      )}
    </button>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading editor...</p>
        </div>
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}
