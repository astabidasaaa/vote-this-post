"use client";

import React from "react";
import SignInBtn from "@/components/SignInBtn";
import { signIn, signOut, useSession } from "next-auth/react";
// import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import Form from "./Form";
import LoadingPage from "@/components/Loading";

type Inputs = {
  username: string;
  password: string;
};

const SignInPage = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    redirect("/home");
  }

  if (status === "loading") return <LoadingPage />;

  return (
    <main className="flex items-center justify-center md:h-screen">
      {/* <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">MAtW</div>
        </div>
        <SignInBtn />
      </div> */}
      <Form />
    </main>
  );
};

export default SignInPage;
