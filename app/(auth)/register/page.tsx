"use client";

// import Link from "next/link";
import { redirect } from "next/navigation";
import { useLayoutEffect, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import Loader from "../loading";
import { useSession } from "next-auth/react";
import Form from "./Form";
import LoadingPage from "@/components/Loading";
import RegisterForm from "./FormV2";

const RegisterPage = () => {
  //   const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") {
    redirect("/home");
  }

  if (status === "loading") return <LoadingPage />;

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center px-4 md:px-12 lg:px-24">
      <div className="w-full max-w-[400px]">
        <RegisterForm />
      </div>
      {/* <Form /> */}
    </main>
  );
};
export default RegisterPage;
