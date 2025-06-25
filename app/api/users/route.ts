import User from "@/lib/models/users";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// Handle OPTIONS preflight
export const OPTIONS = async () => {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN!,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
};

// Handle POST login/register
export const POST = async (req: NextRequest) => {
  const { name, email, image } = await req.json();

  try {
    await connectDB();

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User sudah ada", user: existingUser },
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN!,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    const newUser = await User.create({
      name: name,
      email: email,
      image: image,
    });

    return NextResponse.json(
      { message: "User created", user: newUser },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN!,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Something went error", error: err },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN!,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
};
