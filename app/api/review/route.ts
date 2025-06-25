import { Review } from "@/lib/models/reviews";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// Ganti pakai .env pas deploy
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN!;

// 👉 Handle OPTIONS preflight
export const OPTIONS = async () => {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
};

// 👉 Handle POST ulasan
export const POST = async (req: NextRequest) => {
  const { userId, rating, review } = await req.json();
  try {
    await connectDB();

    const data = await Review.create({
      userId,
      rating,
      review,
    });

    return NextResponse.json(
      {
        message: "Berhasil mengirim ulasan",
        status: "SUCCESS",
        data: data,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error menyimpan review",
        status: "FAILED",
        error: err,
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        },
      }
    );
  }
};
