"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function EditorPage() {
    const [activeTab, setActiveTab] = useState("editor");

    return (
        <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-900">
            <header className="flex h-14 items-center justify-between border-b bg-white px-6 dark:bg-gray-950 dark:border-gray-800">
                <h1 className="text-lg font-bold">Resume Editor</h1>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => window.print()}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Export PDF
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Panel - Editor */}
                <div className="w-1/2 overflow-y-auto border-r bg-white p-6 dark:bg-gray-950 dark:border-gray-800">
                    <h2 className="text-xl font-semibold mb-6">Edit Content</h2>
                    <ResumeForm />
                </div>

                {/* Right Panel - Preview */}
                <div className="w-1/2 overflow-y-auto bg-gray-100 p-8 dark:bg-gray-900">
                    <div className="mx-auto min-h-[1000px] w-[210mm] bg-white shadow-xl dark:bg-white text-black p-10">
                        <ResumePreview />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ResumeForm() {
    const { resumeData, updateField } = useResumeStore();

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900"
                    value={resumeData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Professional Summary</label>
                    <EnhanceButton
                        text={resumeData.summary}
                        onEnhanced={(text) => updateField("summary", text)}
                    />
                </div>
                <textarea
                    className="w-full rounded-md border border-gray-300 p-2 min-h-[100px] dark:border-gray-700 dark:bg-gray-900"
                    value={resumeData.summary}
                    onChange={(e) => updateField("summary", e.target.value)}
                />
            </div>
            {/* Add more fields for Experience, Education etc. later */}
        </div>
    )
}

function ResumePreview() {
    const { resumeData } = useResumeStore();

    return (
        <div className="space-y-4">
            <div className="text-center border-b pb-4">
                <h1 className="text-3xl font-bold uppercase tracking-wide">{resumeData.name || "Your Name"}</h1>
                <p className="text-gray-600">{resumeData.email} | {resumeData.phone}</p>
            </div>

            <div>
                <h3 className="text-lg font-bold uppercase border-b mb-2">Summary</h3>
                <p className="text-sm leading-relaxed">{resumeData.summary || "Professional summary goes here..."}</p>
            </div>
        </div>
    )
}

function EnhanceButton({ text, onEnhanced }: { text: string, onEnhanced: (t: string) => void }) {
    const [loading, setLoading] = useState(false);

    const handleEnhance = async () => {
        if (!text) return;
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/enhance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text })
            });
            const data = await res.json();
            onEnhanced(data.enhanced);
        } catch (e) {
            alert("Failed to enhance text");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleEnhance}
            disabled={loading || !text}
            className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700 disabled:opacity-50"
        >
            <Sparkles className="w-3 h-3" />
            {loading ? "Enhancing..." : "Enhance with AI"}
        </button>
    )
}
