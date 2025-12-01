'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { createClient } from '@/utils/supabase/client'
import { FileText, Plus, Trash2, Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Resume {
    id: number
    title: string
    updated_at: string
}

export default function DashboardPage() {
    const [resumes, setResumes] = useState<Resume[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const fetchResumes = async () => {
            if (!supabase) {
                router.push('/login')
                setLoading(false)
                return
            }

            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push('/login')
                return
            }

            try {
                const res = await fetch('/api/resumes/', {
                    headers: {
                        'Authorization': `Bearer ${session.access_token}`
                    }
                })
                if (res.ok) {
                    const data = await res.json()
                    setResumes(data)
                }
            } catch (error) {
                console.error('Failed to fetch resumes', error)
            } finally {
                setLoading(false)
            }
        }

        fetchResumes()
    }, [router, supabase])

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this resume?')) return

        if (!supabase) return

        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return

        try {
            const res = await fetch(`/api/resumes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${session.access_token}`
                }
            })

            if (res.ok) {
                setResumes(resumes.filter(r => r.id !== id))
            }
        } catch (error) {
            console.error('Failed to delete resume', error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <main className="container mx-auto px-4 py-24">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Resumes</h1>
                    <Link
                        href="/editor"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Create New
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : resumes.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No resumes yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Create your first resume to get started</p>
                        <Link
                            href="/editor"
                            className="text-blue-600 hover:text-blue-500 font-medium"
                        >
                            Start Building &rarr;
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((resume) => (
                            <div key={resume.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/editor?id=${resume.id}`}
                                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors dark:hover:bg-blue-900/20"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(resume.id)}
                                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:hover:bg-red-900/20"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                                    {resume.title || 'Untitled Resume'}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Last updated: {new Date(resume.updated_at).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
