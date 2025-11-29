"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, Sparkles, Upload } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";

export default function Home() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const { setResumeData } = useResumeStore();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setIsUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
      const res = await fetch(`${backendUrl}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      // In a real app, the backend would return structured JSON. 
      // For now, we'll put the raw text in the summary or parse it if possible.
      // Since our current parser returns raw text, we will just put it in summary for now
      // until we implement the AI extraction.

      setResumeData({
        name: "Extracted Candidate", // Placeholder
        email: "",
        phone: "",
        summary: data.extracted_text_preview, // Using the preview as summary for now
        education: [],
        experience: [],
        skills: []
      });

      router.push("/editor");
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Failed to upload resume");
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Transform Your Resume <br /> with AI Intelligence
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Upload your existing resume, choose a premium layout, and let our AI enhance your professional story.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-x-4"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-4">
                <Link
                  href="/editor"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
                >
                  Start from Scratch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <label className="cursor-pointer inline-flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50">
                  <Upload className="mr-2 h-4 w-4" /> Upload Resume
                  <input type="file" className="hidden" accept=".pdf,.docx,.txt" onChange={handleUpload} />
                </label>
              </div>
              {isUploading && <p className="text-sm text-gray-500 animate-pulse">Analyzing your resume...</p>}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container px-4 md:px-6 mt-24 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon={<Upload className="h-10 w-10 text-blue-500" />}
          title="Easy Upload"
          description="Support for PDF, DOCX, and TXT formats. We extract the data for you."
          delay={0.4}
        />
        <FeatureCard
          icon={<Sparkles className="h-10 w-10 text-purple-500" />}
          title="AI Enhancement"
          description="Get smart suggestions to improve your bullet points and summary."
          delay={0.5}
        />
        <FeatureCard
          icon={<FileText className="h-10 w-10 text-green-500" />}
          title="Premium Templates"
          description="Choose from a variety of ATS-friendly and modern designs."
          delay={0.6}
        />
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </motion.div>
  )
}
