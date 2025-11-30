"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import {
  Download, Palette, Share2, FileText, Type, Layout,
  Undo2, Redo2, Eye, History, ChevronRight, X, Check, PlusCircle, Loader2, Save
} from "lucide-react";
import Link from "next/link";
import DynamicResumeRenderer from "@/components/DynamicResumeRenderer";
import AddSectionModal from "@/components/AddSectionModal";
import { Template } from "@/types/resume";
import { motion, AnimatePresence } from "framer-motion";
import { useAutoSave } from "@/hooks/useAutoSave";
import { initGuestSession, api } from "@/utils/api";

function EditorContent() {
  const searchParams = useSearchParams();
  const templateIdParam = searchParams.get("template");

  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Drawer State
  const [activeDrawer, setActiveDrawer] = useState<"templates" | "design" | "history" | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);

  const {
    resumeData,
    setResumeData,
    design,
    setDesign,
    resumeId,
    setResumeId,
    setTemplate
  } = useResumeStore();

  const { isSaving, lastSaved } = useAutoSave();

  // Initialize Session and Resume
  useEffect(() => {
    const init = async () => {
      try {
        await initGuestSession();

        const savedId = localStorage.getItem("active_resume_id");

        // Check for query params to see if we should start fresh with placeholders
        const industry = searchParams.get("industry");
        const experience = searchParams.get("experience");
        const shouldLoadPlaceholder = industry || experience;

        if (savedId) {
          try {
            const resume = await api.get(`/resumes/${savedId}`);
            setResumeData(resume.content);
            setDesign(resume.design);
            setResumeId(resume.id);
            setIsLoading(false);
            return;
          } catch (e) {
            console.warn("Failed to load saved resume, creating new one.", e);
            localStorage.removeItem("active_resume_id");
          }
        }

        // Determine initial content
        let initialContent = resumeData;
        if (shouldLoadPlaceholder) {
          const { getPlaceholderData } = await import("@/utils/placeholders");
          initialContent = getPlaceholderData(industry || "", experience || "");
          setResumeData(initialContent);
        }

        // Create new resume if none found or load failed
        const newResume = await api.post("/resumes", {
          title: "My Resume",
          content: initialContent,
          design: design
        });

        setResumeId(newResume.id);
        localStorage.setItem("active_resume_id", newResume.id.toString());
        setIsLoading(false);

      } catch (error) {
        console.error("Initialization failed:", error);
        setIsLoading(false);
      }
    };

    init();
  }, []);

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
              ? data.find((t: Template) => t.id === parseInt(templateIdParam))
              : data[0];

            // If we have a selected template, we might want to apply it?
            // Only if it's a fresh load or user explicitly selected it.
            // For now just set state.
            setSelectedTemplate(initialTemplate || data[0]);

            // If it's a fresh start (no resumeId yet or just created), maybe apply template?
            // But we handle that via user interaction usually.
          }
        }
      } catch (error) {
        console.error("Failed to fetch templates", error);
      }
    };
    fetchTemplates();
  }, [templateIdParam]);

  // Handle Template Selection
  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setTemplate(template); // Update store
  };

  const toggleDrawer = (drawer: "templates" | "design" | "history") => {
    setActiveDrawer(activeDrawer === drawer ? null : drawer);
  };

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

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-gray-500">Loading your resume...</p>
      </div>
    </div>;
  }

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
          <div className="flex items-center gap-2 text-xs text-gray-400 ml-4">
            {isSaving ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                Saving...
              </>
            ) : lastSaved ? (
              <>
                <Check className="w-3 h-3 text-green-500" />
                Saved
              </>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 mr-4 border-r pr-4 dark:border-gray-800">
            <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800" title="Undo">
              <Undo2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800" title="Redo">
              <Redo2 className="w-4 h-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
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
            <ActionRow
              icon={PlusCircle}
              label="Add Section"
              onClick={() => setShowAddSectionModal(true)}
              iconColorClass="bg-blue-100 text-blue-600"
            />

            <ActionRow
              icon={Layout}
              label="Templates"
              onClick={() => toggleDrawer("templates")}
              isActive={activeDrawer === "templates"}
              iconColorClass="bg-orange-100 text-orange-600"
            />

            <ActionRow
              icon={Palette}
              label="Design & Fonts"
              onClick={() => toggleDrawer("design")}
              isActive={activeDrawer === "design"}
              iconColorClass="bg-pink-100 text-pink-600"
            />

            <ActionRow
              icon={Eye}
              label="Preview"
              onClick={() => setShowPreviewModal(true)}
              iconColorClass="bg-sky-100 text-sky-600"
            />

            <ActionRow
              icon={History}
              label="History"
              onClick={() => toggleDrawer("history")}
              isActive={activeDrawer === "history"}
              iconColorClass="bg-violet-100 text-violet-600"
            />

            <ActionRow
              icon={Share2}
              label="Share"
              onClick={() => { }}
              iconColorClass="bg-green-100 text-green-600"
            />

            <ActionRow
              icon={Download}
              label="Export"
              onClick={() => { }}
              iconColorClass="bg-red-100 text-red-600"
            />

            <ActionRow
              icon={FileText}
              label="Cover Letter"
              onClick={() => { }}
              iconColorClass="bg-indigo-100 text-indigo-600"
            />
          </div>
        </div>

        {/* Add Section Modal */}
        <AddSectionModal
          isOpen={showAddSectionModal}
          onClose={() => setShowAddSectionModal(false)}
        />

        {/* Drawer Panel (Push Layout) */}
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
                <div className="p-4 border-b flex items-center justify-between dark:border-gray-800 shrink-0">
                  <h3 className="font-bold text-lg capitalize">{activeDrawer}</h3>
                  <button onClick={() => setActiveDrawer(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors dark:hover:bg-gray-800">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {activeDrawer === "templates" && (
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
                          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-400">
                            <Layout className="w-8 h-8" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-2 text-xs font-medium dark:bg-gray-900/90 text-left">
                            {template.name}
                          </div>
                          {selectedTemplate?.id === template.id && (
                            <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {activeDrawer === "design" && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-3 text-sm text-gray-500 uppercase tracking-wider">Typography</h4>
                        <div className="relative">
                          <button
                            onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
                            className="w-full px-4 py-3 text-left rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between hover:border-blue-500 transition-colors"
                          >
                            <span className="text-gray-900 dark:text-gray-100 font-medium">
                              {[
                                { name: "Inter", value: "inter" },
                                { name: "Roboto", value: "roboto" },
                                { name: "Open Sans", value: "open-sans" },
                                { name: "Lato", value: "lato" },
                                { name: "Montserrat", value: "montserrat" },
                                { name: "Merriweather", value: "merriweather" },
                                { name: "Playfair Display", value: "playfair" },
                                { name: "Lora", value: "lora" },
                                { name: "Roboto Mono", value: "roboto-mono" }
                              ].find(f => f.value === design.theme?.font)?.name || "Inter"}
                            </span>
                            <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${isFontDropdownOpen ? "rotate-90" : ""}`} />
                          </button>

                          {isFontDropdownOpen && (
                            <div className="absolute w-full mt-2 space-y-1 border border-gray-100 dark:border-gray-800 rounded-xl p-1 bg-white dark:bg-gray-900 shadow-lg z-10">
                              {[
                                { name: "Inter", value: "inter" },
                                { name: "Roboto", value: "roboto" },
                                { name: "Open Sans", value: "open-sans" },
                                { name: "Lato", value: "lato" },
                                { name: "Montserrat", value: "montserrat" },
                                { name: "Merriweather", value: "merriweather" },
                                { name: "Playfair Display", value: "playfair" },
                                { name: "Lora", value: "lora" },
                                { name: "Roboto Mono", value: "roboto-mono" }
                              ].map((font) => (
                                <button
                                  key={font.value}
                                  onClick={() => {
                                    setDesign({ ...design, theme: { ...design.theme, font: font.value } });
                                    setIsFontDropdownOpen(false);
                                  }}
                                  className={`w-full px-3 py-2 text-left rounded-lg transition-all flex items-center justify-between ${design.theme?.font === font.value
                                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    }`}
                                  style={{ fontFamily: `var(--font-${font.value})` }}
                                >
                                  <span className="text-sm">{font.name}</span>
                                  {design.theme?.font === font.value && <Check className="w-3 h-3" />}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3 text-sm text-gray-500 uppercase tracking-wider">Accent Color</h4>
                        <div className="grid grid-cols-5 gap-3">
                          {["blue-600", "purple-600", "green-600", "red-600", "gray-900"].map((color) => (
                            <button
                              key={color}
                              onClick={() => setDesign({ ...design, theme: { ...design.theme, primary: color } })}
                              className={`w-10 h-10 rounded-full border-2 transition-all ${design.theme?.primary === color
                                ? "border-gray-900 scale-110 ring-2 ring-gray-200 dark:border-white dark:ring-gray-700"
                                : "border-transparent hover:scale-105"
                                }`}
                            >
                              <div className={`w-full h-full rounded-full bg-${color}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDrawer === "history" && (
                    <div className="text-center text-gray-500 py-8">
                      <History className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p>Version history coming soon</p>
                    </div>
                  )}
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
              <DynamicResumeRenderer template={selectedTemplate} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Loading template...
            </div>
          )}
        </div>

        {/* Preview Modal (Full Screen) */}
        {showPreviewModal && (
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
                  <DynamicResumeRenderer template={selectedTemplate} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading editor...</div>}>
      <EditorContent />
    </Suspense>
  );
}
