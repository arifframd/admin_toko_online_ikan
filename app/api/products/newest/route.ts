import { Product } from "@/lib/models/products";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();

  try {
    const newestProduct = await Product.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 0,
          name: 1,
          category: 1,
        },
      },
    ]);

    const result = newestProduct.map((product) => {
      return {
        name: product.name,
        category: product.category,
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
