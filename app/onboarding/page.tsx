"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Upload,
  FileText,
  Briefcase,
  GraduationCap,
  Stethoscope,
  Palette,
  TrendingUp,
  BarChart3,
  Code,
  Building,
  Scale,
  Sparkles,
  CheckCircle,
  Clock,
  Award,
  Rocket,
} from "lucide-react";

const industries = [
  { id: "tech", name: "Technology", icon: Code, color: "blue" },
  { id: "business", name: "Business & Finance", icon: TrendingUp, color: "emerald" },
  { id: "healthcare", name: "Healthcare", icon: Stethoscope, color: "cyan" },
  { id: "creative", name: "Creative & Design", icon: Palette, color: "pink" },
  { id: "marketing", name: "Marketing & Sales", icon: BarChart3, color: "orange" },
  { id: "education", name: "Education", icon: GraduationCap, color: "purple" },
  { id: "legal", name: "Legal", icon: Scale, color: "slate" },
  { id: "other", name: "Other", icon: Building, color: "gray" },
];

const experienceLevels = [
  { id: "student", name: "Student / Fresh Graduate", description: "Just starting my career journey", icon: GraduationCap, years: "0-1 years" },
  { id: "junior", name: "Junior Professional", description: "Building my experience", icon: Rocket, years: "1-3 years" },
  { id: "mid", name: "Mid-Level Professional", description: "Growing in my field", icon: Briefcase, years: "3-7 years" },
  { id: "senior", name: "Senior Professional", description: "Experienced expert", icon: Award, years: "7+ years" },
  { id: "executive", name: "Executive / Leadership", description: "C-level or management role", icon: TrendingUp, years: "10+ years" },
];

const templates = [
  { id: 1, name: "Modern Tech", industry: "tech", experience: ["junior", "mid", "senior"], color: "from-blue-500 to-indigo-600", popular: true },
  { id: 2, name: "Clean Minimal", industry: "tech", experience: ["student", "junior"], color: "from-slate-500 to-gray-600", popular: false },
  { id: 3, name: "Executive Pro", industry: "business", experience: ["senior", "executive"], color: "from-gray-700 to-gray-900", popular: true },
  { id: 4, name: "Fresh Start", industry: "all", experience: ["student"], color: "from-green-500 to-emerald-600", popular: true },
  { id: 5, name: "Healthcare Pro", industry: "healthcare", experience: ["mid", "senior"], color: "from-cyan-500 to-teal-600", popular: false },
  { id: 6, name: "Creative Bold", industry: "creative", experience: ["junior", "mid", "senior"], color: "from-pink-500 to-rose-600", popular: true },
  { id: 7, name: "Sales Champion", industry: "marketing", experience: ["mid", "senior"], color: "from-orange-500 to-amber-600", popular: false },
  { id: 8, name: "Academic CV", industry: "education", experience: ["mid", "senior", "executive"], color: "from-purple-500 to-violet-600", popular: false },
];

type Step = "start" | "industry" | "experience" | "templates";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("start");
  const [hasResume, setHasResume] = useState<boolean | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const getRecommendedTemplates = () => {
    return templates.filter((t) => {
      const matchesIndustry = t.industry === "all" || t.industry === selectedIndustry;
      const matchesExperience = t.experience.includes(selectedExperience || "");
      return matchesIndustry || matchesExperience;
    }).slice(0, 6);
  };

  const handleStart = (hasExistingResume: boolean) => {
    setHasResume(hasExistingResume);
    setStep("industry");
  };

  const handleIndustrySelect = (industryId: string) => {
    setSelectedIndustry(industryId);
    setStep("experience");
  };

  const handleExperienceSelect = (expId: string) => {
    setSelectedExperience(expId);
    setStep("templates");
  };

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (hasResume) {
      router.push(`/upload?template=${selectedTemplate}&industry=${selectedIndustry}&experience=${selectedExperience}`);
    } else {
      router.push(`/editor?template=${selectedTemplate}&industry=${selectedIndustry}&experience=${selectedExperience}`);
    }
  };

  const goBack = () => {
    if (step === "industry") setStep("start");
    if (step === "experience") setStep("industry");
    if (step === "templates") setStep("experience");
  };

  const getStepNumber = () => {
    switch (step) {
      case "start": return 1;
      case "industry": return 2;
      case "experience": return 3;
      case "templates": return 4;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                ResumeAI
              </span>
            </Link>

            {/* Progress Indicator */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      getStepNumber() >= num
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500 dark:bg-gray-700"
                    }`}
                  >
                    {getStepNumber() > num ? <CheckCircle className="w-4 h-4" /> : num}
                  </div>
                  {num < 4 && (
                    <div
                      className={`w-8 h-1 mx-1 rounded transition-all ${
                        getStepNumber() > num ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              Exit
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Start */}
            {step === "start" && (
              <motion.div
                key="start"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-3xl mx-auto text-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
                    <Sparkles className="w-4 h-4" />
                    Let&apos;s get started
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
                >
                  Do you have an existing resume?
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-gray-600 dark:text-gray-400 mb-12"
                >
                  We&apos;ll personalize your experience based on your answer
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto"
                >
                  <button
                    onClick={() => handleStart(true)}
                    className="group relative p-8 rounded-2xl border-2 border-gray-200 bg-white hover:border-blue-500 hover:shadow-xl transition-all dark:bg-gray-900 dark:border-gray-700 dark:hover:border-blue-500"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Yes, I have a resume</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Upload your existing resume and we&apos;ll help you improve it with AI
                    </p>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-5 h-5 text-blue-600" />
                    </div>
                  </button>

                  <button
                    onClick={() => handleStart(false)}
                    className="group relative p-8 rounded-2xl border-2 border-gray-200 bg-white hover:border-cyan-500 hover:shadow-xl transition-all dark:bg-gray-900 dark:border-gray-700 dark:hover:border-cyan-500"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <FileText className="w-8 h-8 text-cyan-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No, I&apos;m starting fresh</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Create a new resume from scratch with our guided builder
                    </p>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-5 h-5 text-cyan-600" />
                    </div>
                  </button>
                </motion.div>
              </motion.div>
            )}

            {/* Step 2: Industry */}
            {step === "industry" && (
              <motion.div
                key="industry"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto"
              >
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <div className="text-center mb-12">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                    What industry are you in?
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    We&apos;ll recommend templates tailored to your field
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {industries.map((industry, index) => (
                    <motion.button
                      key={industry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleIndustrySelect(industry.id)}
                      className={`group p-6 rounded-2xl border-2 text-left transition-all ${
                        selectedIndustry === industry.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg dark:bg-gray-900 dark:border-gray-700"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                        selectedIndustry === industry.id 
                          ? "bg-blue-600 text-white" 
                          : "bg-gray-100 text-gray-600 group-hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                      }`}>
                        <industry.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-sm">{industry.name}</h3>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Experience */}
            {step === "experience" && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-3xl mx-auto"
              >
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <div className="text-center mb-12">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                    What&apos;s your experience level?
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    This helps us suggest the right layout and sections
                  </p>
                </div>

                <div className="space-y-4">
                  {experienceLevels.map((level, index) => (
                    <motion.button
                      key={level.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleExperienceSelect(level.id)}
                      className={`w-full group p-5 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                        selectedExperience === level.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg dark:bg-gray-900 dark:border-gray-700"
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        selectedExperience === level.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600 group-hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                      }`}>
                        <level.icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{level.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{level.description}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        {level.years}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Templates */}
            {step === "templates" && (
              <motion.div
                key="templates"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-5xl mx-auto"
              >
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <div className="text-center mb-12">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium mb-4">
                    <Sparkles className="w-4 h-4" />
                    Recommended for you
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                    Choose your template
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Based on your {industries.find(i => i.id === selectedIndustry)?.name} background and experience
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {getRecommendedTemplates().map((template, index) => (
                    <motion.button
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleTemplateSelect(template.id)}
                      className={`group relative rounded-2xl overflow-hidden border-2 transition-all ${
                        selectedTemplate === template.id
                          ? "border-blue-500 ring-4 ring-blue-500/20"
                          : "border-transparent hover:border-gray-200"
                      }`}
                    >
                      <div className={`h-48 bg-gradient-to-br ${template.color} p-6 relative`}>
                        {template.popular && (
                          <span className="absolute top-3 right-3 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                            Popular
                          </span>
                        )}
                        {selectedTemplate === template.id && (
                          <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                          </div>
                        )}
                        <div className="bg-white rounded-lg shadow-xl p-3 transform rotate-2 group-hover:rotate-0 transition-transform">
                          <div className="h-3 w-16 bg-gray-800 rounded mb-2" />
                          <div className="h-2 w-12 bg-gray-300 rounded mb-3" />
                          <div className="space-y-1">
                            <div className="h-1.5 w-full bg-gray-200 rounded" />
                            <div className="h-1.5 w-5/6 bg-gray-200 rounded" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-900">
                        <h3 className="font-semibold">{template.name}</h3>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={handleContinue}
                    disabled={!selectedTemplate}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {hasResume ? "Continue to Upload" : "Start Building"}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="mt-4 text-sm text-gray-500">
                    You can change your template anytime in the editor
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
