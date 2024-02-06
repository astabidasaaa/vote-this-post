import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "./clientPromise";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "username placeholder",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect();
        // Add logic here to look up the user from the credentials supplied
        if (credentials == null) return null;
        // login

        try {
          const user = await User.findOne({ username: credentials.username });

          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isMatch) {
              return user;
            } else {
              throw new Error("Username or password is incorrect");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/home",
    signOut: "/login",
    error: "/register",
  },
  //   callbacks: {
  //     authorized({ auth, request: { nextUrl } }) {
  //       const isLoggedIn = !!auth?.user;

  //       if (isLoggedIn) return true;
  //       return false; // Redirect unauthenticated users to login page
  //     },
  //   },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
