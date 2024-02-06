import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { username } = await req.json();

  await dbConnect();

  // return NextResponse.json({ username }, { status: 200 });
  const sanitizedUsername = await username.toLowerCase();

  try {
    const existingUser = await User.findOne({ username: sanitizedUsername });

    if (existingUser !== null) {
      return NextResponse.json(
        { exist: true },
        {
          status: 200,
        }
      );
    }

    return NextResponse.json(
      { exist: false },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }
};
