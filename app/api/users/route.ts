import User from "@/lib/models/users";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// api untuk menyimpan user ke dalam db
export const POST = async (req: NextRequest) => {
  const { name, email, image } = await req.json();
  try {
    await connectDB();

    const existingUser = await User.findOne({ email: email });
    if (existingUser) return NextResponse.json({ message: "User sudah ada", user: existingUser }, { status: 200 });

    const newUser = await User.create({
      name: name,
      email: email,
      image: image,
    });
    return NextResponse.json({ message: "User created", user: newUser }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Something went error",
        error: err,
      },
      { status: 500 }
    );
  }
};
