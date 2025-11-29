"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Upload, FileText, File, X, CheckCircle, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";
import Navbar from "@/components/Navbar";

export default function UploadPage() {
  const router = useRouter();
  const { setResumeData } = useResumeStore();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "processing" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleFile = async (uploadedFile: File) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain"
    ];
    
    if (!validTypes.includes(uploadedFile.type)) {
      setUploadStatus("error");
      return;
    }

    setFile(uploadedFile);
    setUploadStatus("uploading");
    setProgress(0);

    const uploadInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    setTimeout(() => {
      clearInterval(uploadInterval);
      setProgress(100);
      setUploadStatus("processing");
      
      setTimeout(() => {
        setResumeData({
          name: "John Doe",
          email: "john.doe@email.com",
          phone: "+1 (555) 123-4567",
          summary: "Experienced professional with a proven track record of delivering results. Skilled in project management, team leadership, and strategic planning.",
          education: [
            {
              institution: "State University",
              degree: "Bachelor of Science in Computer Science",
              start_date: "2015",
              end_date: "2019",
              description: ""
            }
          ],
          experience: [
            {
              company: "Tech Company Inc.",
              position: "Senior Software Engineer",
              start_date: "Jan 2020",
              end_date: "Present",
              description: "Led development of key features, mentored junior developers, and improved system performance by 40%."
            }
          ],
          skills: [
            { name: "JavaScript", level: "Expert" },
            { name: "React", level: "Expert" },
            { name: "Node.js", level: "Advanced" },
            { name: "Python", level: "Intermediate" }
          ]
        });
        
        setUploadStatus("success");
      }, 2000);
    }, 1500);
  };

  const removeFile = () => {
    setFile(null);
    setUploadStatus("idle");
    setProgress(0);
  };

  const continueToEditor = () => {
    router.push("/editor");
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return <FileText className="w-8 h-8 text-red-500" />;
    if (type.includes("word")) return <FileText className="w-8 h-8 text-blue-500" />;
    return <File className="w-8 h-8 text-gray-500" />;
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Upload Your <span className="text-blue-600">Resume</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Upload your existing resume and we&apos;ll extract your information automatically using AI.
            </p>
          </motion.div>

          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-2xl border-2 border-dashed transition-all ${
                isDragging
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : uploadStatus === "error"
                  ? "border-red-300 bg-red-50 dark:bg-red-900/20"
                  : "border-gray-200 bg-white hover:border-blue-300 dark:border-gray-700 dark:bg-gray-900"
              }`}
            >
              {!file ? (
                <label className="flex flex-col items-center justify-center p-12 cursor-pointer">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                    isDragging ? "bg-blue-100 dark:bg-blue-800" : "bg-gray-100 dark:bg-gray-800"
                  }`}>
                    <Upload className={`w-8 h-8 ${isDragging ? "text-blue-600" : "text-gray-400"}`} />
                  </div>
                  <p className="text-lg font-medium mb-2">
                    {isDragging ? "Drop your file here" : "Drag & drop your resume"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    or click to browse
                  </p>
                  <div className="flex gap-3">
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium dark:bg-red-900/30">
                      PDF
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-medium dark:bg-blue-900/30">
                      DOCX
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium dark:bg-gray-800">
                      TXT
                    </span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileInput}
                  />
                </label>
              ) : (
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    {getFileIcon(file.type)}
                    <div className="flex-1">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    {uploadStatus !== "processing" && uploadStatus !== "success" && (
                      <button
                        onClick={removeFile}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-400" />
                      </button>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {(uploadStatus === "uploading" || uploadStatus === "processing") && (
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-400">
                          {uploadStatus === "uploading" ? "Uploading..." : "Processing with AI..."}
                        </span>
                        <span className="text-blue-600">{progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Processing Animation */}
                  {uploadStatus === "processing" && (
                    <div className="flex items-center justify-center gap-3 py-4">
                      <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
                      <span className="text-purple-600 font-medium">
                        Extracting information with AI...
                      </span>
                    </div>
                  )}

                  {/* Success State */}
                  {uploadStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Resume Parsed Successfully!</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        We&apos;ve extracted your information. Review and edit in the editor.
                      </p>
                      <button
                        onClick={continueToEditor}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:scale-105"
                      >
                        Continue to Editor
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}

                  {/* Error State */}
                  {uploadStatus === "error" && (
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <p className="text-red-600 text-sm">
                        Invalid file type. Please upload a PDF, DOCX, or TXT file.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Tips for best results:
            </h3>
            <ul className="space-y-3">
              {[
                "Use a clear, well-structured resume format",
                "Ensure text is selectable (not an image)",
                "Include section headers like 'Experience' and 'Education'",
                "PDF format typically gives the best extraction results",
              ].map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Alternative Option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Don&apos;t have a resume?{" "}
              <a href="/editor" className="text-blue-600 font-medium hover:text-blue-700">
                Start from scratch
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
