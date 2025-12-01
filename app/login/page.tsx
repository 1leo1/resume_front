'use client'

import { login, signup } from './actions'
import { useActionState, useState } from 'react'
import { Loader2, Mail, Lock, ArrowRight, Github, Linkedin, FileText } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
    const [stateLogin, formActionLogin] = useActionState(login, null)
    const [stateSignup, formActionSignup] = useActionState(signup, null)
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = () => {
        setIsLoading(true)
        // Reset loading after a delay if no redirect happens (error case)
        setTimeout(() => setIsLoading(false), 2000)
    }

    const handleSocialLogin = async (provider: 'github' | 'linkedin_oidc') => {
        const supabase = createClient()
        await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: 'https://claycv.com/auth/callback',
            },
        })
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Left Side - Branding & Testimonial */}
            <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden flex-col justify-between p-12 text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 opacity-90" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-xl">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">
                            ClayCV
                        </span>
                    </Link>
                </div>

                <div className="relative z-10 max-w-md">
                    <blockquote className="text-2xl font-medium leading-relaxed">
                        "The most intuitive resume builder I've ever used. It helped me land my dream job at a top tech company."
                    </blockquote>
                    <div className="mt-6 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/20" />
                        <div>
                            <div className="font-semibold">Alex Chen</div>
                            <div className="text-blue-200 text-sm">Software Engineer</div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm text-blue-200">
                    © 2024 ClayCV Inc. All rights reserved.
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-12 lg:w-1/2 bg-white dark:bg-gray-950">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {isLoginMode ? 'Welcome back' : 'Create an account'}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {isLoginMode ? 'Enter your details to access your resume.' : 'Start building your professional resume today.'}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* OAuth Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('github')}
                                className="flex items-center justify-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-100 hover:shadow-sm transition-all cursor-pointer dark:border-gray-800 dark:hover:bg-gray-800"
                            >
                                <Github className="w-5 h-5 text-gray-900 dark:text-white" />
                                <span className="ml-2 text-sm font-medium">GitHub</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('linkedin_oidc')}
                                className="flex items-center justify-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-100 hover:shadow-sm transition-all cursor-pointer dark:border-gray-800 dark:hover:bg-gray-800"
                            >
                                <Linkedin className="w-5 h-5 text-[#0077b5]" />
                                <span className="ml-2 text-sm font-medium">LinkedIn</span>
                            </button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-800" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white dark:bg-gray-950 px-2 text-gray-500">Or continue with email</span>
                            </div>
                        </div>

                        <form action={isLoginMode ? formActionLogin : formActionSignup} onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        minLength={6}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:bg-gray-900 dark:border-gray-800 dark:text-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {(stateLogin?.error || stateSignup?.error) && (
                                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm dark:bg-red-900/20 dark:text-red-400">
                                    {stateLogin?.error || stateSignup?.error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        {isLoginMode ? 'Sign in' : 'Create account'}
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="text-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400">
                                {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                            </span>
                            <button
                                onClick={() => setIsLoginMode(!isLoginMode)}
                                className="font-medium text-blue-600 hover:text-blue-500 transition-colors cursor-pointer"
                            >
                                {isLoginMode ? 'Sign up' : 'Sign in'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

