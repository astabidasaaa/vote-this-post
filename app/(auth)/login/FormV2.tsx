import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nullable, z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  // const [errorMessage, setErrorMessage] = useState<{
  //   variant: "destructive" | "default" | null | undefined;
  //   title: string;
  //   description: string;
  //   action: ToastActionElement | undefined;
  // }>({
  //   variant: "destructive",
  //   title: "",
  //   description: "",
  //   action: undefined,
  // });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { username, password } = values;
    const login = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (typeof login !== undefined && !login?.ok) {
      switch (login?.error) {
        case "Error: USER":
          toast({
            variant: "destructive",
            title: "User not found!",
            description:
              "Please make sure the username is correct and try again.",
            action: undefined,
          });

          break;
        case "Error: PASSWORD":
          toast({
            variant: "destructive",
            title: "Password is incorrect",
            description: "Please verify your password and try again.",
            action: undefined,
          });

          break;
        default:
          return;
      }
    }

    // try {
    //   const res = await fetch("/api/auth/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ username, password }),
    //   });

    //   const login = await res.json();

    //   console.log(login);
    // } catch (err: any) {
    //   alert(err);
    // }

    // toast({
    //   variant: "destructive",
    //   title: "Uh oh! Something went wrong.",
    //   description: "There was a problem with your request.",
    //   action: <ToastAction altText="Try again">Try again</ToastAction>,
    // });

    // console.log(login);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Log in"
            )}
          </Button>
        </form>
        <FormItem className="!mt-4">
          <FormLabel className="font-bold">
            Don&apos;t have an account?{" "}
            <Link href={"/register"} className="underline hover:no-underline">
              {" "}
              Create account
            </Link>
          </FormLabel>
        </FormItem>
      </Form>
    </>
  );
};

export default LoginForm;
