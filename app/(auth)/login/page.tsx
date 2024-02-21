"use client";

import React from "react";
// import SignInBtn from "@/components/SignInBtn";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { useLayoutEffect } from "react";
// import { redirect } from "next/navigation";
// import Form from "./Form";
// import LoadingPage from "@/components/Loading";
import LoginForm from "./FormV2";
// import { Button } from "@/components/ui/button";

type Inputs = {
  username: string;
  password: string;
};

const SignInPage = () => {
  // const { data: session, status } = useSession();

  // if (status === "authenticated") {
  //   redirect("/home");
  // }

  // if (status === "loading") return <LoadingPage />;

  // console.log(session);

  return (
    <>
      <LoginForm />
    </>
  );
};

export default SignInPage;
