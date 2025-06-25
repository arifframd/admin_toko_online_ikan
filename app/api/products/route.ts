import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/lib/models/products";

// Untuk sekarang, hardcoded localhost dulu, bisa ganti pakai env nanti
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN!;

export const GET = async () => {
  try {
    await connectDB();

    const products = await Product.find();
    if (!products) {
      return NextResponse.json(
        { message: "No products found" },
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
        success: true,
        message: "Semua produk berhasil diambil",
        data: products,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error mengambil produk",
        error: error.message,
        success: false,
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
