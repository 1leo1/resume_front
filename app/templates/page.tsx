"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Briefcase, GraduationCap, Stethoscope, Palette, TrendingUp, BarChart3, Code, Building, Heart, Camera, Filter, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  { id: "all", name: "All Templates", count: 100 },
  { id: "tech", name: "Technology", count: 24 },
  { id: "business", name: "Business", count: 18 },
  { id: "creative", name: "Creative", count: 16 },
  { id: "healthcare", name: "Healthcare", count: 14 },
  { id: "education", name: "Education", count: 12 },
  { id: "marketing", name: "Marketing", count: 16 },
];

const templates = [
  { id: 1, name: "Modern Developer", category: "tech", style: "Modern", color: "from-blue-500 to-indigo-600", icon: Code, popular: true },
  { id: 2, name: "Tech Lead", category: "tech", style: "Professional", color: "from-violet-500 to-purple-600", icon: Code, popular: true },
  { id: 3, name: "Software Engineer", category: "tech", style: "Minimal", color: "from-cyan-500 to-blue-600", icon: Code, popular: false },
  { id: 4, name: "Data Scientist", category: "tech", style: "Modern", color: "from-emerald-500 to-teal-600", icon: BarChart3, popular: true },
  { id: 5, name: "Executive Suite", category: "business", style: "Professional", color: "from-gray-700 to-gray-900", icon: Building, popular: true },
  { id: 6, name: "Business Analyst", category: "business", style: "Modern", color: "from-blue-600 to-blue-800", icon: TrendingUp, popular: false },
  { id: 7, name: "Project Manager", category: "business", style: "Minimal", color: "from-amber-500 to-orange-600", icon: Briefcase, popular: true },
  { id: 8, name: "Creative Director", category: "creative", style: "Bold", color: "from-pink-500 to-rose-600", icon: Palette, popular: true },
  { id: 9, name: "UX Designer", category: "creative", style: "Modern", color: "from-purple-500 to-pink-600", icon: Palette, popular: true },
  { id: 10, name: "Photographer", category: "creative", style: "Minimal", color: "from-gray-600 to-gray-800", icon: Camera, popular: false },
  { id: 11, name: "Registered Nurse", category: "healthcare", style: "Professional", color: "from-teal-500 to-cyan-600", icon: Heart, popular: true },
  { id: 12, name: "Medical Doctor", category: "healthcare", style: "Classic", color: "from-blue-600 to-indigo-700", icon: Stethoscope, popular: false },
  { id: 13, name: "Professor", category: "education", style: "Classic", color: "from-amber-600 to-yellow-700", icon: GraduationCap, popular: false },
  { id: 14, name: "Research Scholar", category: "education", style: "Academic", color: "from-indigo-500 to-violet-600", icon: GraduationCap, popular: true },
  { id: 15, name: "Marketing Manager", category: "marketing", style: "Modern", color: "from-orange-500 to-red-600", icon: BarChart3, popular: true },
  { id: 16, name: "Social Media", category: "marketing", style: "Bold", color: "from-pink-500 to-purple-600", icon: TrendingUp, popular: false },
];

const styles = ["All Styles", "Modern", "Professional", "Minimal", "Classic", "Bold", "Academic"];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("All Styles");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesStyle = selectedStyle === "All Styles" || template.style === selectedStyle;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStyle && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Professional Resume <span className="text-blue-600">Templates</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Choose from 100+ ATS-friendly templates designed for every industry. Find the perfect match for your career.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-gray-100 dark:border-gray-800 sticky top-16 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 outline-none transition-all dark:bg-gray-900 dark:border-gray-700"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.slice(0, 5).map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Style Filter */}
            <div className="relative">
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="appearance-none pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 outline-none transition-all cursor-pointer dark:bg-gray-900 dark:border-gray-700"
              >
                {styles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <Link href={`/editor?template=${template.id}`}>
                  <div className="relative overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-xl transition-all hover:-translate-y-1">
                    {/* Template Preview */}
                    <div className={`relative h-64 bg-gradient-to-br ${template.color} p-6 overflow-hidden`}>
                      {template.popular && (
                        <span className="absolute top-3 right-3 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                          Popular
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/5" />
                      
                      {/* Mock Resume Preview */}
                      <div className="relative bg-white rounded-lg shadow-2xl p-3 transform rotate-2 group-hover:rotate-0 transition-transform">
                        <div className="h-3 w-20 bg-gray-800 rounded mb-2" />
                        <div className="h-2 w-16 bg-gray-300 rounded mb-3" />
                        <div className="space-y-1.5">
                          <div className="h-1.5 w-full bg-gray-200 rounded" />
                          <div className="h-1.5 w-5/6 bg-gray-200 rounded" />
                          <div className="h-1.5 w-4/6 bg-gray-200 rounded" />
                        </div>
                        <div className="mt-3 h-2 w-12 bg-gray-800 rounded mb-2" />
                        <div className="space-y-1">
                          <div className="h-1.5 w-full bg-gray-200 rounded" />
                          <div className="h-1.5 w-5/6 bg-gray-200 rounded" />
                        </div>
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <template.icon className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{template.style}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {template.name}
                      </h3>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8">
                      <span className="px-6 py-2 bg-white rounded-full text-blue-600 font-medium text-sm">
                        Use This Template
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400">No templates found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
