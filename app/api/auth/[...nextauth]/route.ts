import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID || "",
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        CredentialsProvider({
            name: "Guest / Dev",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "guest" },
            },
            async authorize(credentials, req) {
                // Mock user for development
                if (credentials?.username) {
                    return { id: "1", name: credentials.username, email: `${credentials.username}@example.com` }
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                // session.user.id = token.sub; // Add user ID to session
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST };
