import { Transaction } from "@/lib/models/transactions";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();

  // mengambil data transaksi per bulan
  try {
    const now = new Date();
    const startYear = new Date(now.getFullYear(), 0, 1); // Jan 01
    const endYear = new Date(now.getFullYear(), 11, 31); // Dec 31

    const monthlySales = await Transaction.aggregate([
      {
        $match: {
          status: "settlement",
          createdAt: {
            $gte: startYear,
            $lte: endYear,
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$total" },
        },
      },
    ]);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const result = months.map((month, i) => {
      const found = monthlySales.find((m) => m._id === i + 1);
      return {
        month,
        total: found ? found.total : 0,
      };
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      {
        message: "Unexpected Error",
        error: err,
      },
      {
        status: 500,
      }
    );
  }
};
