import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "./prisma";
import { isRateLimited, recordFailure, resetAttempts } from "./rate-limit";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email);
        // Atrás do nginx, X-Forwarded-For = "<client-spoofável>, <ip-real>".
        // O último valor é o anexado pelo proxy (não-spoofável); use-o.
        const xff = request?.headers?.get("x-forwarded-for");
        const ip = xff ? xff.split(",").pop()!.trim() : "unknown";
        const rlKey = `${ip}:${email}`;

        // Bloqueia após muitas falhas na janela (anti brute-force).
        if (isRateLimited(rlKey)) {
          return null;
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.password) {
          recordFailure(rlKey);
          return null;
        }

        const isValid = await compare(String(credentials.password), user.password);

        if (!isValid) {
          recordFailure(rlKey);
          return null;
        }

        resetAttempts(rlKey);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
});
