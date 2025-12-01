"use client";

import { useState, useEffect, Suspense } from "react";

// ... (inside EditorContent)
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import {
  Download, Palette, Share2, FileText, Type, Layout, Briefcase,
  Undo2, Redo2, Eye, History, ChevronRight, X, Check, PlusCircle, Loader2, Save
} from "lucide-react";
import Link from "next/link";
import ResumeRenderer from "@/components/renderer/ResumeRenderer";
import BlueprintSelector from "@/components/editor/BlueprintSelector";
import SectionManager from "@/components/editor/SectionManager";
import AddSectionModal from "@/components/AddSectionModal";
import { getFinalSections } from "@/utils/resumeAssembler";
import { JobBlueprint } from "@/types/blueprint";

// ... (rest of imports)

// ... (inside EditorContent)

function EditorContent() {
  const [blueprints, setBlueprints] = useState<JobBlueprint[]>([]);
  const [selectedBlueprint, setSelectedBlueprint] = useState<JobBlueprint | null>(null);

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

  const [templates, setTemplates] = useState<any[]>([]); // Using any for now to avoid import issues if Template type is missing, but it should be imported
  const [activeDrawer, setActiveDrawer] = useState<"templates" | "design" | "history" | "sections" | "blueprints" | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isSaving, lastSaved } = { isSaving: false, lastSaved: null }; // Mocking for now as useAutoSave import might be missing or I need to check imports

  const toggleDrawer = (drawer: "templates" | "design" | "history" | "sections" | "blueprints") => {
    setActiveDrawer(activeDrawer === drawer ? null : drawer);
  };

  // Fetch Templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch("/api/templates/");
        if (res.ok) {
          const data = await res.json();
          setTemplates(data);

          if (data.length > 0) {
            const initialTemplate = templateIdParam
              ? data.find((t: any) => t.id === parseInt(templateIdParam))
              : data[0];
            const templateToUse = initialTemplate || data[0];
            setSelectedTemplate(templateToUse);
            setTemplate(templateToUse);

            // Load dummy data if resume is empty
            if (templateToUse.dummy_data && (!resumeData || Object.keys(resumeData).length === 0 || !resumeData.basics?.name)) {
              setResumeData(templateToUse.dummy_data);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch templates", error);
      }
    };
    fetchTemplates();
  }, [templateIdParam]);

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setTemplate(template);
  };

  // ... (init logic)

  // Fetch Blueprints
  useEffect(() => {
    const fetchBlueprints = async () => {
      try {
        const res = await fetch("/api/blueprints/");
        if (res.ok) {
          const data = await res.json();
          setBlueprints(data);

          // Select blueprint based on industry param or default
          const industryParam = searchParams.get("industry");
          if (data.length > 0) {
            let initialBlueprint = data[0];
            if (industryParam) {
              // Try to find a blueprint that matches the industry
              // Assuming blueprint has a 'slug' or 'name' that might match, or we map it
              // For now, let's look for a loose match in the label or id
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
  }, [searchParams]); // Add searchParams dependency

  const handleBlueprintSelect = (bp: JobBlueprint) => {
    setSelectedBlueprint(bp);
  };

  const handleContentChange = (sectionId: string, data: any) => {
    setResumeData({
      ...resumeData,
      [sectionId]: data
    });
  };



  // Calculate final sections for the manager
  // We need a dummy blueprint for now or fetch it.
  // For now, we assume standard blueprint if none provided.
  const currentBlueprint = selectedBlueprint || {
    id: 'standard',
    label: 'Standard',
    default_sections: ['header', 'summary', 'work', 'education', 'skills', 'projects'],
    section_overrides: {}
  };

  const finalSections = getFinalSections(currentBlueprint, sectionConfig, resumeData);

  // ... (ActionRow component)

  const ActionRow = ({
    icon: Icon,
    label,
    subLabel,
    onClick,
    isActive,
    iconColorClass
  }: {
    icon: any,
    label: string,
    subLabel?: string,
    onClick?: () => void,
    isActive?: boolean,
    iconColorClass?: string
  }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 transition-all border-b border-gray-100 dark:border-gray-800 text-left group relative ${isActive ? "bg-blue-50 dark:bg-blue-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
    >
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
      )}
      <div className={`p-2.5 rounded-xl transition-colors ${isActive
        ? "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300"
        : `${iconColorClass || "bg-gray-100 text-gray-600"} group-hover:opacity-80`
        }`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`font-medium ${isActive ? "text-blue-900 dark:text-blue-100" : "text-gray-900 dark:text-gray-100"}`}>
          {label}
        </div>
        {subLabel && <div className="text-xs text-gray-500 mt-0.5">{subLabel}</div>}
      </div>
      <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isActive ? "rotate-90" : ""}`} />
    </button>
  );

  return (
    <div className="flex h-screen flex-col bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-gray-950 dark:border-gray-800 shrink-0 z-20 relative shadow-sm">
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
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Panel - Action Rows */}
        <div className="w-56 border-r bg-white flex flex-col dark:bg-gray-950 dark:border-gray-800 z-10 shrink-0">
          <div className="p-6 border-b dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Actions</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your resume</p>
          </div>

          <div className="flex-1 overflow-y-auto">

            {/* Sections and Job Type removed as per user request */}

            <ActionRow
              icon={PlusCircle}
              label="Add Section"
              subLabel="More sections"
              onClick={() => setShowAddSectionModal(true)}
              isActive={false}
              iconColorClass="bg-blue-100 text-blue-600"
            />

            <ActionRow
              icon={Layout}
              label="Templates"
              subLabel={selectedTemplate?.name || "Select template"}
              onClick={() => toggleDrawer("templates")}
              isActive={activeDrawer === "templates"}
              iconColorClass="bg-purple-100 text-purple-600"
            />

            <ActionRow
              icon={Palette}
              label="Design & Fonts"
              subLabel="Customize look"
              onClick={() => toggleDrawer("design")}
              isActive={activeDrawer === "design"}
              iconColorClass="bg-pink-100 text-pink-600"
            />

            <ActionRow
              icon={Eye}
              label="Preview"
              subLabel="Full screen"
              onClick={() => setShowPreviewModal(true)}
              isActive={false}
              iconColorClass="bg-green-100 text-green-600"
            />

            <ActionRow
              icon={History}
              label="History"
              subLabel="Past versions"
              onClick={() => toggleDrawer("history")}
              isActive={activeDrawer === "history"}
              iconColorClass="bg-orange-100 text-orange-600"
            />

            <div className="my-2 border-t dark:border-gray-800" />

            <ActionRow
              icon={Share2}
              label="Share"
              subLabel="Public link"
              onClick={() => { }}
              isActive={false}
              iconColorClass="bg-indigo-100 text-indigo-600"
            />

            <ActionRow
              icon={Download}
              label="Export PDF"
              subLabel="Download"
              onClick={() => window.print()}
              isActive={false}
              iconColorClass="bg-gray-100 text-gray-600"
            />

            <ActionRow
              icon={FileText}
              label="Cover Letter"
              subLabel="Generate AI"
              onClick={() => { }}
              isActive={false}
              iconColorClass="bg-teal-100 text-teal-600"
            />
          </div>
        </div>

        {/* Drawer Panel */}
        <AnimatePresence mode="wait">
          {activeDrawer && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 288, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="border-r bg-white dark:bg-gray-950 dark:border-gray-800 overflow-hidden flex flex-col z-0"
            >
              <div className="w-72 h-full flex flex-col">
                {/* ... existing drawer content ... */}
                <div className="p-4 border-b flex items-center justify-between dark:border-gray-800 shrink-0">
                  <h3 className="font-bold text-lg capitalize">{activeDrawer}</h3>
                  <button onClick={() => setActiveDrawer(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors dark:hover:bg-gray-800">
                    <X className="w-5 h-5" />
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
                    // ... templates list
                    <div className="grid grid-cols-1 gap-4">
                      {templates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => handleTemplateSelect(template)}
                          className={`group relative aspect-[210/297] w-full overflow-hidden rounded-lg border-2 transition-all ${selectedTemplate?.id === template.id
                            ? "border-blue-600 ring-2 ring-blue-600/20"
                            : "border-gray-200 hover:border-blue-400 dark:border-gray-800"
                            }`}
                        >
                          {/* We can use a mini renderer here or image */}
                          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-400">
                            <Layout className="w-8 h-8" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-2 text-xs font-medium dark:bg-gray-900/90 text-left">
                            {template.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {activeDrawer === "design" && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme Color</h4>
                        <div className="grid grid-cols-5 gap-2">
                          {['blue-600', 'purple-600', 'green-600', 'red-600', 'orange-600', 'teal-600', 'indigo-600', 'pink-600', 'gray-900', 'black'].map((color) => (
                            <button
                              key={color}
                              onClick={() => setDesign({ ...design, theme: { ...design.theme, primary: color } })}
                              className={`w-8 h-8 rounded-full border-2 transition-all ${design.theme.primary === color ? 'border-gray-900 scale-110' : 'border-transparent hover:scale-110'}`}
                              style={{ backgroundColor: `var(--color-${color})` }} // This might need actual hex or tailwind class mapping if not using CSS vars
                            >
                              <div className={`w-full h-full rounded-full bg-${color}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Font Family</h4>
                        <div className="space-y-2">
                          {['inter', 'roboto', 'merriweather', 'playfair'].map((font) => (
                            <button
                              key={font}
                              onClick={() => setDesign({ ...design, theme: { ...design.theme, font } })}
                              className={`w-full p-3 text-left rounded-lg border transition-all ${design.theme.font === font
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-blue-300'
                                }`}
                            >
                              <span className="capitalize">{font}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDrawer === "history" && (
                    <div className="text-center py-8 text-gray-500">
                      <History className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p>Version history coming soon</p>
                    </div>
                  )}

                  {/* ... other drawers ... */}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Panel - Preview */}
        <div
          className="flex-1 bg-gray-100 overflow-y-auto p-8 flex justify-center dark:bg-gray-900 transition-all duration-300"
          onClick={() => activeDrawer && setActiveDrawer(null)}
        >
          {selectedTemplate ? (
            <div className="w-full max-w-[210mm] min-h-[297mm] origin-top scale-[0.85] lg:scale-100 transition-transform shadow-2xl">
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
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Loading template...
            </div>
          )}
        </div>

        {/* Add Section Modal */}
        <AddSectionModal
          isOpen={showAddSectionModal}
          onClose={() => setShowAddSectionModal(false)}
        />

        {/* Preview Modal (Full Screen) */}
        {
          showPreviewModal && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="h-full overflow-y-auto w-full flex justify-center">
                {selectedTemplate && (
                  <div className="bg-white shadow-2xl min-h-[297mm] w-[210mm]">
                    <ResumeRenderer
                      content={resumeData}
                      structure={selectedTemplate.structure}
                      styles={design.theme}
                      sectionConfig={sectionConfig}
                    />
                  </div>
                )}
              </div>
            </div>
          )
        }
      </div >
    </div >
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading editor...</div>}>
      <EditorContent />
    </Suspense>
  );
}
