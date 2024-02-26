import dbConnect from "@/lib/mongoose";
import UserVoteModel from "@/models/UserVote";
import { NextRequest, NextResponse } from "next/server";
import VotePromptModel from "@/models/Post";
import Post from "@/models/Post";
import { getToken } from "next-auth/jwt";

// type ResponseData = {
//   message: string;
// };

export const POST = async (req: NextRequest) => {
  await dbConnect();

  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateUniquePostId = async (min: number, max: number) => {
    let postId;
    do {
      postId = getRandomInt(min, max);
      // Check if the generated ID already exists in the database
      const existingPost = await Post.findOne({ postId });

      if (!existingPost) {
        break;
      }
    } while (true);
    return postId;
  };

  // if (req.method === "POST") {
  const { postBody, candidates } = await req.json();

  const minId = 999999;
  const maxId = 999999999;

  // Generate a unique post ID
  const postIdGenerated = await generateUniquePostId(minId, maxId);

  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  try {
    await Post.create({
      userId: token?.sub,
      username: token?.name,
      postId: postIdGenerated,
      postBody: postBody.trim(),
      candidates,
    });
    // console.log(req.body.json());

    return NextResponse.json(
      {
        userId: token?.sub,
        username: token?.name,
        postId: postIdGenerated,
        postBody,
        candidates,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
  // } else {
  //   res.status(405).json({ error: "Method Not Allowed" });
  // }
};

export const GET = async (req: NextRequest) => {
  await dbConnect();

  try {
    const posts = await Post.find();

    return NextResponse.json(
      {
        posts,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
