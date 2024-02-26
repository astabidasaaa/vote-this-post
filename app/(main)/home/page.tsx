"use client";

// pages/index.tsx
import React, { useState, useEffect } from "react";
// import connectDB from "../lib/mongoose";
// import VoteModel from "../models/Vote";
// import SignInBtn from "@/components/SignInBtn";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { useLayoutEffect } from "react";
// import { redirect } from "next/navigation";
// import LoadingPage from "@/components/Loading";
import { Button } from "@/components/ui/button";
import PostInput from "./PostInput";
import Timeline from "./Timeline";

interface Candidates {
  _id: string;
  description: string;
  user: string;
  candidate: string;
  timestamp: string;
  rating: string;
}

const HomePage = () => {
  // useEffect(() => {
  //   const fetchVotePrompts = async () => {
  //     const response = await fetch("/api/vote", {
  //       method: "GET",
  //     });
  //     const data = await response.json();
  //     setVotePrompts(data);
  //   };

  //   fetchVotePrompts();
  // }, []);

  // useEffect(() => {
  //   // Fetch candidates from MongoDB
  //   const fetchData = async () => {
  //     await connectDB();
  //     const data = await VoteModel.find();
  //     setCandidates(data);
  //   };

  //   fetchData();
  // }, []);

  // const handleVote = async (id: string) => {
  //   try {
  //     await VoteModel.findByIdAndUpdate(id, { $inc: { votes: 1 } });
  //     // Update state after voting
  //     setCandidates((prevCandidates: Candidates[]): Candidates[] =>
  //       prevCandidates.map((candidate) =>
  //         candidate._id === id
  //           ? { ...candidate, votes: candidate.votes + 1 }
  //           : candidate
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error voting:", error);
  //   }
  // };

  // const { data, status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/login");
  //     // The user is not authenticated, handle it here.
  //   },
  // });

  // useLayoutEffect(() => {
  // const isAuth = status;

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const handleTestJWT = async () => {
    try {
      const res = await fetch("/api/test-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ username: "aaa", password: "1234" }),
      });

      if (res.ok) {
        console.log(await res.json());
      }
    } catch (err: any) {
      alert("Oops! Something went wrong. Please try again later");
    }
  };

  // const handleTestSession = async () => {
  //   try {
  //     console.log(data);
  //   } catch (err: any) {
  //     alert("Oops! Something went wrong. Please try again later");
  //   }
  // };

  // if (status === "unauthenticated") {
  //   redirect("/login");
  // }

  // if (status === "loading") return <LoadingPage />;

  return (
    <div className="">
      {/* <h2>Hello world</h2>
      <Button onClick={handleTestJWT}>JWT</Button> */}
      <div className="w-full py-8 px-4 md:px-12 lg:px-24 flex flex-col justify-start items-center gap-12">
        <PostInput />
        <Timeline />
      </div>
      {/* <Button onClick={handleTestSession}>Session</Button> */}
      {/* {candidates.map((candidate) => (
        <div key={candidate._id}>
          <h3>{candidate.candidate}</h3>
          <p>Votes: {candidate.votes}</p>
          <button onClick={() => handleVote(candidate._id)}>Vote</button>
        </div>
      ))} */}
    </div>
  );
};

export default HomePage;
