"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AuthSync() {
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user) {
            // Sync user with backend
            fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: session.user.email,
                    name: session.user.name,
                    provider: "nextauth" // Simplified for now
                }),
            }).catch(err => console.error("Failed to sync user", err));
        }
    }, [session]);

    return null;
}
