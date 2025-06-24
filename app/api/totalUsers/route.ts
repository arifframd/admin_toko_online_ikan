import User from "@/lib/models/users";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();

  try {
    const userSummary = await User.aggregate([
      {
        $group: {
          _id: "$role", // group berdasarkan role
          count: { $sum: 1 }, // hitung jumlah user
        },
      },
      {
        $project: {
          role: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    const users = userSummary.map((user) => {
      return {
        label: user.role,
        value: user.count,
      };
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unexpected Error",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
};
