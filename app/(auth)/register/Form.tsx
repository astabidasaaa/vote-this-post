import React, { useLayoutEffect, useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";

type Inputs = {
  username: string;
  password: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [message, setMessage] = useState<null | string>(null);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { username, password } = form;

    try {
      // const res = await fetch("/api/user", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(form),
      // });

      // if (res.ok) {
      //   await signIn("credentials", {
      //     username: username,
      //     password: password,
      //     redirect: true,
      //     callbackUrl: "/home",
      //   });
      // }
      console.log("registered");
    } catch (err: any) {
      setMessage(err);
    }
    // console.log(JSON.stringify(form));
  };

  const handleUsernameBlur = async (event: { target: HTMLInputElement }) => {
    const username = event.target.value;
    try {
      const response = await fetch(`/api/user-validation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.exist) {
          // setMessage("Username is already taken");
          setError("username", {
            type: "existed",
            message: "Username is already taken",
          });
        }
      } else {
        // setMessage("Failed to validate username");
        setError("username", {
          type: "failed",
          message: "Failed to validate username",
        });
      }
    } catch (error) {
      // setMessage("Failed to validate username");
      setError("username", {
        type: "failed",
        message: "Failed to validate username",
      });
    }

    // console.log(username);
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)} autoComplete="off">
      <fieldset>
        <div>
          <label htmlFor="username">Username</label>
          <input
            {...register("username", {
              required: "Username is required",
              pattern: /^[a-zA-Z0-9_]{3,20}$/,
              minLength: 3,
              maxLength: 20,
            })}
            type="text"
            autoComplete="false"
            onBlur={handleUsernameBlur}
          />
          {errors.username?.message && <small>{errors.username.message}</small>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              //   pattern:
              //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,
            })}
            autoComplete="new-password"
          />
          {errors.password?.message && <small>{errors.password.message}</small>}
        </div>
      </fieldset>
      <div>
        <p>
          <Link href="/login">Login with an existing account</Link>
        </p>
        {message && <small>{message}</small>}
        <button type="submit" disabled={isSubmitting}>
          Register
        </button>
      </div>
      {/* {isSubmitting && <Loader />} */}
    </form>
  );
};

export default Form;
