"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { signIn } from "next-auth/react";

const usernamePattern = /^[a-zA-Z0-9_.]{3,20}$/;
const passwordPattern =
  /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

const formSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: "Username must be 4 or more characters long" })
      .max(20, { message: "Username must be 20 or fewer characters long" })
      .regex(usernamePattern, {
        message:
          "Username may only contain letters, numbers, underscores (_), and dots (.), with no spaces",
      })
      .superRefine(async (val, ctx) => {
        // console.log({ val });
        try {
          const response = await fetch(`/api/user-validation`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: val }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.exist) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Username is already taken",
              });

              return z.NEVER;
            }
          } else {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Failed to validate username",
            });

            return z.NEVER;
          }
        } catch (error) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Failed to validate username",
          });

          return z.NEVER;
        }
      }),
    password: z
      .string()
      .min(8, { message: "Password must be 8 or more characters long" })
      .regex(passwordPattern, {
        message: "Password must contain at least one alphanumeric character",
      }),
    confirm_password: z.string(),
  })
  .superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirm_password"],
        message: "The passwords did not match",
      });
    }
  });

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { username, password } = values;

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        await signIn("credentials", {
          username,
          password,
          redirect: true,
          callbackUrl: "/home",
        });
      }
      // console.log("registered");
    } catch (err: any) {
      alert("Oops! Something went wrong. Please try again later");
    }
    // console.log(JSON.stringify(form));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your password" {...field} />
              </FormControl>
              <FormDescription>
                The password will be encrypted, but don&apos;t use your usual
                password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm your password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="!mt-8"
          disabled={form.formState.isSubmitting}
        >
          Create account
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
