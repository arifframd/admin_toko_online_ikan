import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import UserInfo from "@/lib/models/userinfo";

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN!;

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { id, alamat, kodePos, noHp, kota } = await req.json();

    const updated = await UserInfo.findOneAndUpdate({ userId: id }, { address: alamat, phoneNumber: noHp, postalCode: kodePos, city: kota }, { new: true, upsert: true });

    return NextResponse.json(
      { message: "User info saved", data: updated },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to save user info" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
      }
    );
  }
}

// ✅ Preflight untuk POST
export const OPTIONS = async () => {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
