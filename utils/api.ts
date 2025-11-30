import { createClient } from '@supabase/supabase-js';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const getHeaders = async () => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    // 1. Check for Supabase Session (if we had access to it here easily, 
    // but usually we need the hook. For now, let's assume we might pass it or rely on Guest ID first)
    // Actually, getting the session outside a component is tricky with Supabase helpers.
    // Let's rely on localStorage for Guest ID.

    const guestId = localStorage.getItem('guest_id');
    if (guestId) {
        headers['X-Guest-ID'] = guestId;
    }

    // TODO: Add Bearer token if logged in. 
    // For now, we focus on Guest flow as per task.

    return headers;
};

export const initGuestSession = async () => {
    if (typeof window === 'undefined') return;

    const guestId = localStorage.getItem('guest_id');
    if (!guestId) {
        try {
            const res = await fetch(`${API_URL}/auth/guest`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('guest_id', data.id);
                console.log("Guest session initialized:", data.id);
                return data;
            }
        } catch (error) {
            console.error("Failed to init guest session:", error);
        }
    }
    return { id: guestId };
};

export const api = {
    get: async (endpoint: string) => {
        const headers = await getHeaders();
        const res = await fetch(`${API_URL}${endpoint}`, { headers });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },
    post: async (endpoint: string, body: any) => {
        const headers = await getHeaders();
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },
    patch: async (endpoint: string, body: any) => {
        const headers = await getHeaders();
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },
    put: async (endpoint: string, body: any) => {
        const headers = await getHeaders();
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    }
};
