import { Transaction } from "@/lib/models/transactions";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();

  try {
    const newestOrder = await Transaction.aggregate([
      {
        $match: {
          status: "settlement",
        },
      },
      {
        $sort: {
          createdAt: -1, // descending, jadi yang terbaru duluan
        },
      },
      {
        $limit: 5, // ambil 5 paling baru
      },
      {
        $project: {
          _id: 0,
          order_id: 1,
          name: 1,
          createdAt: 1,
        },
      },
    ]);

    const orders = newestOrder.map((order) => {
      return {
        order_id: order.order_id,
        name: order.name,
      };
    });

    return NextResponse.json(orders);
  } catch (err) {
    return NextResponse.json(
      {
        message: "Unexpected Error",
        error: err,
      },
      {
        status: 5000,
      }
    );
  }
};
