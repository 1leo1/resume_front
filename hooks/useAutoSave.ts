import { useEffect, useRef, useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { api } from '@/utils/api';

export function useAutoSave() {
    const { resumeData, design, resumeId } = useResumeStore();
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        if (!resumeId) return;

        setIsSaving(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(async () => {
            try {
                await api.patch(`/resumes/${resumeId}`, {
                    content: resumeData,
                    design: design
                });
                console.log("Auto-save successful");
                setLastSaved(new Date());
            } catch (error) {
                console.error("Auto-save failed:", error);
            } finally {
                setIsSaving(false);
            }
        }, 2000); // Debounce for 2 seconds

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [resumeData, design, resumeId]);

    return { isSaving, lastSaved };
}
