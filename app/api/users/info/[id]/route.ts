import { RouteParams } from "@/lib";
import UserInfo from "@/lib/models/userinfo";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN!;

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  try {
    await connectDB();

    const userInfo = await UserInfo.findOne({ userId: id }).populate("userId", "name email");

    return NextResponse.json(userInfo || {}, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error fetching user info" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        },
      }
    );
  }
}
