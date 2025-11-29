# ResumeAI - AI-Powered Resume Builder

## Quick Start
```bash
npm run dev
```
The app runs on http://0.0.0.0:5000

---

## Overview
ResumeAI is a modern, AI-powered resume builder application built with Next.js 16. It allows users to create professional, ATS-friendly resumes with guided workflows, industry-specific templates, and AI enhancement features.

## Project Structure
```
├── app/                    # Next.js App Router
│   ├── api/auth/          # NextAuth.js API routes
│   ├── auth/signin/       # Authentication pages
│   ├── editor/            # Resume editor with live preview
│   ├── features/          # Features showcase page
│   ├── onboarding/        # Guided onboarding flow
│   ├── pricing/           # Pricing plans page
│   ├── templates/         # Template gallery
│   ├── upload/            # Resume upload with drag-and-drop
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles with Tailwind
├── components/            # Reusable UI components
│   ├── Navbar.tsx         # Navigation bar
│   └── Footer.tsx         # Footer component
├── store/                 # State management
│   └── useResumeStore.ts  # Zustand store for resume data
└── public/                # Static assets
```

## Key Features

### User Journey
1. **Landing Page**: Compelling hero section with CTAs
2. **Onboarding Flow**: 4-step guided process
   - Step 1: Choose between upload or create from scratch
   - Step 2: Select industry (Tech, Business, Healthcare, Creative, etc.)
   - Step 3: Choose experience level (Student to Executive)
   - Step 4: Pick recommended template
3. **Resume Editor**: Split-view with form editor and live preview
4. **Template Gallery**: 100+ industry-specific templates with filters

### Authentication
- Google, GitHub, LinkedIn OAuth (requires API keys)
- Email/password registration
- Guest/dev mode for development

### Core Functionality
- Drag-and-drop resume upload (PDF, DOCX, TXT)
- Real-time preview with template switching
- AI enhancement buttons (mock for UI, backend integration needed)
- Section-based editing (Personal, Experience, Education, Skills)
- PDF export via browser print

## Tech Stack
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Authentication**: NextAuth.js
- **Icons**: Lucide React

## Development

### Run locally
```bash
npm run dev
```
Server runs on port 5000 at http://0.0.0.0:5000

### Build for production
```bash
npm run build
npm run start
```

## Environment Variables

### Required for OAuth (Optional - app works without)
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `GITHUB_ID` / `GITHUB_SECRET`
- `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET`

### NextAuth Configuration
- `NEXTAUTH_SECRET`: Session encryption key
- `NEXTAUTH_URL`: Base URL of the application

## Backend Integration Notes

This is a **frontend-only** application. The following API endpoints are referenced but require backend implementation:

- `POST /upload` - Resume file upload and parsing
- `POST /enhance` - AI text enhancement
- `POST /auth/login` - User session sync

When backend is ready, update the `NEXT_PUBLIC_BACKEND_URL` environment variable.

## Session Changes (November 29, 2025)

### Bug Fixes
- **Fixed text readability on landing page**: The hero heading "Build Your Perfect Resume in Minutes" was using gradient text with transparent fill, making it hard to read against the colored background. Changed to solid colors (dark gray/white for contrast) with blue highlight on "Perfect Resume".

### UX Improvements
- **Updated call-to-action routing**: All "Get Started Free" buttons now point to `/onboarding` instead of `/editor` and `/auth/signin`, ensuring users go through the guided onboarding flow first for a better personalized experience.

### Deployment
- **Configured production deployment**: Set up autoscale deployment with build and run commands for production readiness.

## Recent Changes (Previous Sessions)
- Initial setup with guided onboarding flow
- Industry-specific template gallery
- Resume editor with live preview
- Authentication UI with OAuth buttons
- Responsive design for all screen sizes
