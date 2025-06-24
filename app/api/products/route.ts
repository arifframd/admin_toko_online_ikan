import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/lib/models/products";

export const GET = async () => {
  try {
    await connectDB();

    const products = await Product.find();
    if (!products) {
      return NextResponse.json({ message: "No products found" }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      message: "Semua produk berhasil diambil",
      data: products,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error mengambil produk",
      error: error.message,
      success: false,
    });
  }
};
