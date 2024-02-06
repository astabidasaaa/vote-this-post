import React, { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Inputs = {
  username: string;
  password: string;
};

const Form = () => {
  const params = useSearchParams()!;
  const session = useSession();
  // const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    setError(params.get("error"));
  }, [params]);

  const formSubmit: SubmitHandler<Inputs> = (form) => {
    const { username, password } = form;
    signIn("credentials", {
      username,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)} autoComplete="off">
      <fieldset>
        <div>
          <label htmlFor="username">Username</label>
          <input
            {...register("username", {
              required: "Username is required",
            })}
            type="text"
            autoComplete="false"
          />
          {errors.username?.message && <small>{errors.username.message}</small>}
        </div>
        <div className="w-full px-2">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
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
        {/* <p>
          <Link href="/login">Login with an existing account</Link>
        </p> */}
        {error && <small>{error}</small>}
        <button type="submit" disabled={isSubmitting}>
          Login
        </button>
      </div>
      {/* {isSubmitting && <Loader />} */}
    </form>
  );
};

export default Form;
