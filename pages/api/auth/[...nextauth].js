import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import sha256 from "crypto-js/sha256";

export const authOptions = {
  secret: "secret key that definitely should not be here",
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      page: {
        SignIn: "/login",
      },
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });
        if (user) {
          const hashedPassword = sha256(credentials.password).toString();
          if (user.password === hashedPassword) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          }
        }
        // If you return null or false then the credentials will be rejected
        throw "/login?error=Invalid username or password";
        // You can also Reject this callback with an Error or with a URL:
        // throw new Error('error message') // Redirect to error page
        // throw '/path/to/redirect'        // Redirect to a URL
      },
    }),
  ],
};

export default NextAuth(authOptions);
