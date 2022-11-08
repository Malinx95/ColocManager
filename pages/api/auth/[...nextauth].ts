import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: "secret key that definitely should not be here",
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({
          where: {
            username: credentials?.username,
          },
        });
        prisma.$disconnect();
        if (user) {
          const hashedPassword = credentials?.password;
          if (user.password === hashedPassword) {
            return {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
            } as User;
          }
        }
        throw "/login?error=Invalid username or password";
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        username: token.username,
        firstName: token.firstName,
        lastName: token.lastName,
      } as User;
      return session;
    },
  },
};

export default NextAuth(authOptions);
