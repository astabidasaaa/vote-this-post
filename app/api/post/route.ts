import dbConnect from "@/lib/mongoose";
import UserVoteModel from "@/models/UserVote";
import { NextRequest, NextResponse } from "next/server";
import VotePromptModel from "@/models/Post";
import Post from "@/models/Post";

// type ResponseData = {
//   message: string;
// };

export const POST = async (req: NextRequest) => {
  await dbConnect();

  // if (req.method === "POST") {
  const { username, postBody, candidates, upVotes, downVotes, saves } =
    await req.json();

  try {
    await Post.create({
      username,
      postBody,
      candidates,
      upVotes,
      downVotes,
      saves,
    });
    // console.log(req.body.json());

    return NextResponse.json({ message: `Post: ${username}` }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
  // } else {
  //   res.status(405).json({ error: "Method Not Allowed" });
  // }
};
