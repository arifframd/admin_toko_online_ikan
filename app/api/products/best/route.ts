import { Product } from "@/lib/models/products";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN!;

export const GET = async () => {
  await connectDB();
  try {
    const bestSellerProducts = await Product.find({ category: "Komplit" }).sort({ createdAt: -1 }).limit(4);
    if (!bestSellerProducts || bestSellerProducts.length === 0) {
      return NextResponse.json(
        {
          message: "No best seller products found",
        },
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          },
        }
      );
    }
    return NextResponse.json(
      {
        message: "Berhasil mengambil best seller product",
        data: bestSellerProducts,
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
        message: "Error mengambil best seller product",
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
