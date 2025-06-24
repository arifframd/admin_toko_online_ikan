import { Review } from "@/lib/models/reviews";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId, rating, review } = await req.json();
  try {
    await connectDB();
    // kirim ke review ke db
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
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error menyimpan review",
        status: "FAILED",
        error: err,
      },
      { status: 500 }
    );
  }
};
