import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
  }
  interface CredentialInput {
    username: string;
    password: string;
  }
  interface Session {
    user: User;
  }
}
