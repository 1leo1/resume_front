"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, Sparkles, Upload, CheckCircle, Star, Zap, Shield, BarChart3, Users, Award, Briefcase, GraduationCap, Stethoscope, Palette, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { value: "50,000+", label: "Resumes Created" },
  { value: "95%", label: "Success Rate" },
  { value: "100+", label: "Templates" },
  { value: "4.9/5", label: "User Rating" },
];

const templates = [
  { name: "Tech Professional", industry: "Technology", color: "from-blue-500 to-indigo-600", icon: Briefcase },
  { name: "Creative Designer", industry: "Creative", color: "from-pink-500 to-rose-600", icon: Palette },
  { name: "Business Executive", industry: "Business", color: "from-emerald-500 to-teal-600", icon: TrendingUp },
  { name: "Healthcare Pro", industry: "Healthcare", color: "from-cyan-500 to-blue-600", icon: Stethoscope },
  { name: "Academic Scholar", industry: "Education", color: "from-purple-500 to-violet-600", icon: GraduationCap },
  { name: "Marketing Expert", industry: "Marketing", color: "from-orange-500 to-amber-600", icon: BarChart3 },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    content: "ResumeAI helped me land my dream job! The AI suggestions were spot-on and the templates are stunning.",
    avatar: "SC",
  },
  {
    name: "Michael Rodriguez",
    role: "Marketing Director",
    content: "I've tried many resume builders, but this one stands out. The industry-specific templates made all the difference.",
    avatar: "MR",
  },
  {
    name: "Emily Thompson",
    role: "UX Designer at Spotify",
    content: "The live preview and AI enhancement features saved me hours. Highly recommend to anyone job hunting!",
    avatar: "ET",
  },
];

const faqs = [
  {
    question: "Is ResumeAI free to use?",
    answer: "Yes! You can create and download resumes for free. Premium templates and AI features are available with our Pro plan.",
  },
  {
    question: "Are the resumes ATS-friendly?",
    answer: "Absolutely. All our templates are designed to pass Applicant Tracking Systems while still looking professional.",
  },
  {
    question: "Can I import my existing resume?",
    answer: "Yes, you can upload your existing resume in PDF, DOCX, or TXT format. Our AI will extract and organize your information.",
  },
  {
    question: "How does the AI enhancement work?",
    answer: "Our AI analyzes your content and suggests improvements for clarity, impact, and keyword optimization based on your target industry.",
  },
];

export default function Home() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { setResumeData } = useResumeStore();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    
    setTimeout(() => {
      setResumeData({
        name: "",
        email: "",
        phone: "",
        summary: "",
        education: [],
        experience: [],
        skills: []
      });
      router.push("/editor");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AI-Powered Resume Builder
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              Build Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                Perfect Resume
              </span>
              <br />
              in Minutes
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl"
            >
              Create stunning, ATS-friendly resumes with AI-powered suggestions. 
              Choose from 100+ industry-specific templates and land your dream job.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link
                href="/onboarding"
                className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 text-base font-medium text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:scale-105"
              >
                Create Your Resume <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/onboarding"
                className="inline-flex h-14 items-center justify-center rounded-full border-2 border-gray-200 bg-white px-8 text-base font-medium shadow-sm hover:border-blue-300 hover:bg-blue-50 transition-all dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-600 dark:hover:bg-gray-800"
              >
                <Upload className="mr-2 h-5 w-5 text-blue-600" /> Upload Existing Resume
              </Link>
            </motion.div>
            
            {isUploading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-blue-600"
              >
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span>Analyzing your resume...</span>
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>ATS-friendly</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Create Your Resume in <span className="text-blue-600">3 Easy Steps</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our streamlined process makes building a professional resume quick and effortless.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Choose a Template", description: "Browse 100+ industry-specific templates designed by HR experts and choose the one that fits your style.", icon: FileText },
              { step: "02", title: "Fill in Your Details", description: "Enter your information or upload an existing resume. Our AI will help organize and enhance your content.", icon: Sparkles },
              { step: "03", title: "Download & Apply", description: "Preview your resume, make final adjustments, and download in PDF format. You're ready to apply!", icon: Award },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow h-full">
                  <div className="text-6xl font-bold text-gray-100 dark:text-gray-800 absolute top-4 right-4">
                    {item.step}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for <span className="text-blue-600">Job Seekers</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to create a standout resume that gets you noticed.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: "AI-Powered Suggestions", description: "Get smart recommendations to improve your bullet points and make your achievements shine.", color: "text-purple-500" },
              { icon: Shield, title: "ATS-Friendly Formats", description: "All templates are optimized to pass Applicant Tracking Systems used by 90% of companies.", color: "text-green-500" },
              { icon: Zap, title: "Real-time Preview", description: "See changes instantly as you edit. What you see is exactly what recruiters will see.", color: "text-yellow-500" },
              { icon: Users, title: "Industry Templates", description: "Choose from templates tailored for tech, healthcare, finance, creative, and more.", color: "text-blue-500" },
              { icon: Upload, title: "Easy Import", description: "Upload your existing resume in PDF, DOCX, or TXT. We'll extract and organize your data.", color: "text-cyan-500" },
              { icon: Star, title: "Premium Designs", description: "Stand out with modern, professionally designed layouts that catch recruiters' attention.", color: "text-pink-500" },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <feature.icon className={`w-10 h-10 ${feature.color} mb-4`} />
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Templates for <span className="text-blue-600">Every Industry</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find the perfect template that matches your profession and personal style.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {templates.map((template, index) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className={`relative h-64 rounded-xl bg-gradient-to-br ${template.color} p-6 overflow-hidden transition-transform group-hover:scale-105`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative z-10">
                    <template.icon className="w-10 h-10 text-white/90 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-1">{template.name}</h3>
                    <p className="text-white/80 text-sm">{template.industry}</p>
                  </div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-tl-full" />
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              View All Templates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by <span className="text-blue-600">Professionals</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of job seekers who landed their dream jobs using ResumeAI.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
          </motion.div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 text-left hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold pr-4">{faq.question}</h3>
                    <div className={`w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center transition-transform ${openFaq === index ? "rotate-45" : ""}`}>
                      <span className="text-blue-600 text-xl leading-none">+</span>
                    </div>
                  </div>
                  {openFaq === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-gray-600 dark:text-gray-400 mt-4"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Your Perfect Resume?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join over 50,000 professionals who have landed their dream jobs with ResumeAI.
            </p>
            <Link
              href="/onboarding"
              className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-medium text-blue-600 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
