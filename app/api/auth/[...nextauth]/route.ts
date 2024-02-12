import NextAuth from "next-auth/next";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "./clientPromise";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/lib/auth";
// import jwt from "jsonwebtoken";

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
          const user = await User.findOne({
            username: credentials.username.toLowerCase(),
          });

          if (user) {
            // console.log(user);
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isMatch) {
              // return {
              //   id: user._id.toString(),
              //   username: user.name,
              // };
              return user;
              // return { username: user.username };
            } else {
              throw new Error("PASSWORD");
            }
          } else {
            throw new Error("USER");
            // throw NextResponse.json(
            //   { message: `User not found` },
            //   { status: 409 }
            // );
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
    error: "/login",
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      // if (user) {
      // token.sub = null;
      // token.user = user.name;
      //   //   // token.expires = "1d";
      // token.JWT = await new SignJWT({
      //   username: user.name,
      //   id: user.id,
      // })
      //   .setProtectedHeader({ alg: "HS256" })
      //   .setIssuedAt()
      //   .setExpirationTime("10s")
      //   .sign(getJwtSecretKey());
      // token = await jwt.sign(user, process.env.JWT_SIGNING_PRIVATE_KEY!, {
      //   expiresIn: "10s",
      // });
      // const response = NextResponse.json(
      //   { success: true },
      //   { status: 200, headers: { "content-type": "application/json" } }
      // );
      // await response.cookies.set("token", token.JWT, {
      //   httpOnly: true,
      // });
      // return response;
      // token.name = user.name;
      // }

      // if (account?.accessToken) {
      //   token.accessToken = account.accessToken;
      // }

      return token;
      // return Promise.resolve(token);
    },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // session.expires = "7d";
      // session.user = token.user as any;
      session = token as any;
      // session.user.
      // session.user = token.JWT as any;

      // session.user.id = token.id;

      // const accessTokenData = JSON.parse(atob(token.token.split(".")?.at(1)));
      // session.user = accessTokenData;
      // token.accessTokenExpires = accessTokenData.exp;

      // session.token = token?.token;

      // return session;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
