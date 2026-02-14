import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // Utilisation de JSON Web Tokens pour la session
  },
  pages: {
    signIn: "/login", // On définit notre page de connexion personnalisée
  },
  providers: [
    CredentialsProvider({
      name: "Email/Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Recherche de l'utilisateur dans la base sur Coolify
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { tenant: true } // On récupère aussi les infos de son agence
        });

        if (!user) return null;

        // Vérification du mot de passe haché
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          tenantId: user.tenantId, // CRUCIAL pour le multi-tenant
        };
      }
    })
  ],
  callbacks: {
    // On injecte le tenantId et le rôle dans le token JWT
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.tenantId = user.tenantId;
      }
      return token;
    },
    // On rend ces infos disponibles dans la session côté client (React)
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.tenantId = token.tenantId;
      }
      return session;
    }
  }
};