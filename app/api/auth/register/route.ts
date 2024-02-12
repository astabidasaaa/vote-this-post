import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";

export const POST = async (request: NextRequest) => {
  const { username, password } = await request.json();

  await dbConnect();

  const sanitizedUsername = await username.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    const existingUser = await User.findOne({ username: sanitizedUsername });

    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;

    if (existingUser === null) {
      if (usernamePattern.test(sanitizedUsername)) {
        await User.create({
          username: sanitizedUsername,
          password: hashedPassword,
        });

        return NextResponse.json(
          { message: "User has been created", username: sanitizedUsername },
          {
            status: 201,
          }
        );
      } else {
        return NextResponse.json(
          { message: "Invalid username format" },
          {
            status: 400,
          }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Username is already exist" },
        {
          status: 409,
        }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }
};

// export const GET = async (request: NextApiRequest) => {
//   try {
//     return NextApiResponse.json(
//       { message: "User has been queried" },
//       {
//         status: 201,
//       }
//     );
//   } catch (error: any) {
//     return NextApiResponse.json(
//       { error },
//       {
//         status: 500,
//       }
//     );
//   }
// };
