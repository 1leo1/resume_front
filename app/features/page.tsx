"use client";

import { motion } from "framer-motion";
import { Sparkles, Shield, Zap, Users, Upload, Star, FileText, Download, Palette, BarChart3, Globe, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Suggestions",
    description: "Get intelligent recommendations to improve your bullet points, enhance your professional summary, and make your achievements stand out.",
    color: "purple",
  },
  {
    icon: Shield,
    title: "ATS-Friendly Formats",
    description: "All our templates are designed to pass Applicant Tracking Systems used by 90% of Fortune 500 companies.",
    color: "green",
  },
  {
    icon: Zap,
    title: "Real-time Preview",
    description: "See changes instantly as you edit. Our live preview shows exactly what recruiters will see when reviewing your resume.",
    color: "yellow",
  },
  {
    icon: Users,
    title: "Industry Templates",
    description: "Choose from 100+ templates tailored for tech, healthcare, finance, creative industries, and more.",
    color: "blue",
  },
  {
    icon: Upload,
    title: "Easy Import",
    description: "Upload your existing resume in PDF, DOCX, or TXT format. Our AI extracts and organizes your data automatically.",
    color: "cyan",
  },
  {
    icon: Palette,
    title: "Customizable Designs",
    description: "Personalize colors, fonts, and layouts to match your personal brand and stand out from the crowd.",
    color: "pink",
  },
  {
    icon: Download,
    title: "Multiple Export Formats",
    description: "Download your resume as PDF, share via link, or export to Word format for maximum flexibility.",
    color: "indigo",
  },
  {
    icon: BarChart3,
    title: "Resume Analytics",
    description: "Track how many times your resume is viewed and downloaded. Get insights to improve your job search.",
    color: "orange",
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description: "Create resumes in multiple languages with automatic formatting adjustments for international job applications.",
    color: "teal",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "Your data is encrypted and never shared. You have full control over your information at all times.",
    color: "slate",
  },
  {
    icon: FileText,
    title: "Cover Letter Builder",
    description: "Generate matching cover letters with AI assistance. Customize for each job application effortlessly.",
    color: "rose",
  },
  {
    icon: Star,
    title: "Expert Tips",
    description: "Get industry-specific advice and best practices from career coaches and HR professionals.",
    color: "amber",
  },
];

const colorClasses: Record<string, { bg: string; text: string; lightBg: string }> = {
  purple: { bg: "bg-purple-600", text: "text-purple-600", lightBg: "bg-purple-100 dark:bg-purple-900/30" },
  green: { bg: "bg-green-600", text: "text-green-600", lightBg: "bg-green-100 dark:bg-green-900/30" },
  yellow: { bg: "bg-yellow-500", text: "text-yellow-600", lightBg: "bg-yellow-100 dark:bg-yellow-900/30" },
  blue: { bg: "bg-blue-600", text: "text-blue-600", lightBg: "bg-blue-100 dark:bg-blue-900/30" },
  cyan: { bg: "bg-cyan-600", text: "text-cyan-600", lightBg: "bg-cyan-100 dark:bg-cyan-900/30" },
  pink: { bg: "bg-pink-600", text: "text-pink-600", lightBg: "bg-pink-100 dark:bg-pink-900/30" },
  indigo: { bg: "bg-indigo-600", text: "text-indigo-600", lightBg: "bg-indigo-100 dark:bg-indigo-900/30" },
  orange: { bg: "bg-orange-600", text: "text-orange-600", lightBg: "bg-orange-100 dark:bg-orange-900/30" },
  teal: { bg: "bg-teal-600", text: "text-teal-600", lightBg: "bg-teal-100 dark:bg-teal-900/30" },
  slate: { bg: "bg-slate-600", text: "text-slate-600", lightBg: "bg-slate-100 dark:bg-slate-900/30" },
  rose: { bg: "bg-rose-600", text: "text-rose-600", lightBg: "bg-rose-100 dark:bg-rose-900/30" },
  amber: { bg: "bg-amber-600", text: "text-amber-600", lightBg: "bg-amber-100 dark:bg-amber-900/30" },
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Powerful Features
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Everything You Need to{" "}
              <span className="text-blue-600 dark:text-blue-400">Land Your Dream Job</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you create professional resumes that get noticed by recruiters and pass ATS systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const colors = colorClasses[feature.color];
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-xl ${colors.lightBg} flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Create your professional resume in minutes with our easy-to-use builder.
            </p>
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-blue-600 font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Start Building Your Resume
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
