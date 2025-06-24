import { RouteParams } from "@/lib";
import { Product } from "@/lib/models/products";
import { connectDB } from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const DELETE = async (req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;

  await connectDB();

  try {
    const product = await Product.findById(id);
    if (!product) return Response.json({ status: "NOT FOUND" }, { status: 404 });

    // hapus gambar dari cloudinary
    const { public_id } = product;
    await cloudinary.uploader.destroy(public_id);

    const deletedProduct = await Product.deleteOne({ _id: id });
    return NextResponse.json({ message: "Berhasil menghapus produk", status: "SUCCESS", data: deletedProduct }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error saat menghapus produk", error: err, status: "FAILED" }, { status: 500 });
  }
};
