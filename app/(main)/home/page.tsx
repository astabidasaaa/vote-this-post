"use client";

// pages/index.tsx
import React, { useState, useEffect } from "react";
// import connectDB from "../lib/mongoose";
// import VoteModel from "../models/Vote";
import SignInBtn from "@/components/SignInBtn";
import { signIn, signOut, useSession } from "next-auth/react";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import LoadingPage from "@/components/Loading";

interface Candidates {
  _id: string;
  description: string;
  user: string;
  candidate: string;
  timestamp: string;
  rating: string;
}

const VotingPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidates[]>([]);

  const [votePrompts, setVotePrompts] = useState([]);

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

  useEffect(() => {
    console.log(votePrompts);
  }, [votePrompts]);
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

  const { status } = useSession();

  // useLayoutEffect(() => {
  // const isAuth = status;

  // console.log(status);

  if (status === "unauthenticated") {
    redirect("/login");
  }
  // }, [status]);

  if (status === "loading") return <LoadingPage />;

  return (
    <div>
      <h2>Hello world</h2>
      <SignInBtn />

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

export default VotingPage;
