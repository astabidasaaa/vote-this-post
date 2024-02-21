"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data, status } = useSession();

  // console.log(data?.user);

  return (
    <div className="w-screen flex flex-row justify-between items-center">
      <div className="flex flex-row gap-4">
        <span>Navbar</span>
        {status !== "unauthenticated" && (
          <>
            <Link href={`/home`}>Home</Link>
            <Link href={`/${data?.user?.name}`}>Profile</Link>
            <Link href={`/notifications`}>Notifications</Link>
          </>
        )}
      </div>
      <div>
        {status === "loading" ? (
          <div>loading</div>
        ) : status === "authenticated" ? (
          <button onClick={() => signOut()}>Sign Out</button>
        ) : (
          <button onClick={() => signIn("google")}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
