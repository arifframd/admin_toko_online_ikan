import { Transaction } from "@/lib/models/transactions";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();

  const now = new Date();
  const startYear = new Date(now.getFullYear(), 0, 1); // Jan 01
  const endYear = new Date(now.getFullYear(), 11, 31); // Dec 31
  try {
    const orderByMonth = await Transaction.aggregate([
      {
        $match: {
          status: "settlement",
          createdAt: {
            $gte: startYear, // Date object contoh: new Date("2025-01-01")
            $lte: endYear, // Date object contoh: new Date("2025-12-31")
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by bulan
          orders: {
            $push: {
              order_id: "$order_id",
              product_name: "$product_name",
              name: "$name",
              address: "$address",
              quantity: "$quantity",
              total: "$total",
            },
          },
        },
      },
      {
        $sort: { _id: 1 }, // biar urut Januari–Desember
      },
    ]);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const result = months.map((month, i) => {
      const found = orderByMonth.find((m) => m._id === i + 1);
      return {
        month,
        orders: found ? found.orders : [],
      };
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error saat mengambil data monthly orders",
        error: err,
      },
      { status: 500 }
    );
  }
};
