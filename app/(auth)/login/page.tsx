"use client";

import React from "react";
import SignInBtn from "@/components/SignInBtn";
import { signIn, signOut, useSession } from "next-auth/react";
// import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import Form from "./Form";
import LoadingPage from "@/components/Loading";
import LoginForm from "./FormV2";

type Inputs = {
  username: string;
  password: string;
};

const SignInPage = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    redirect("/home");
  }

  if (status === "loading") return <LoadingPage />;

  // console.log(session);

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center px-4 md:px-12 lg:px-24">
      <div className="w-full max-w-[400px]">
        <LoginForm />
      </div>
    </main>
  );
};

export default SignInPage;
