"use client";

// import Link from "next/link";
import { redirect } from "next/navigation";
import { useLayoutEffect, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import Loader from "../loading";
import { useSession } from "next-auth/react";
import Form from "./Form";
import LoadingPage from "@/components/Loading";

const RegisterPage = () => {
  //   const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") {
    redirect("/home");
  }

  if (status === "loading") return <LoadingPage />;

  return (
    <div>
      <Form />
    </div>
  );
};
export default RegisterPage;
