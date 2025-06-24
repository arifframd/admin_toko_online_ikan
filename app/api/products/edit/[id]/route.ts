import { RouteParams } from "@/lib";
import { updateProduct } from "@/lib/actions";
import { Product } from "@/lib/models/products";
import { connectDB } from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

// Konfigurasi Cloudinary untuk edit produk form
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const GET = async (req: NextRequest, { params }: RouteParams) => {
  await connectDB();
  try {
    const { id } = await params;
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ message: "Product tidak ada" }, { status: 200 });
    }
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error dalam menemukan produk",
        error: err,
      },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest, { params }: RouteParams) => {
  const formData = await req.formData();

  const file = formData.get("link") as File | null;

  try {
    await connectDB();
    const { id } = await params;
    // temukan public_id gambar produk
    const product = await Product.findById(id);
    let public_id = product.public_id;
    let imageUrl = product.imageUrl;

    // cek apakah gambar lama ada
    if (file && file.size > 0) {
      // hapus gambar lama
      await cloudinary.uploader.destroy(product.public_id);

      // upload gambar baru
      const arrayBuffer = await file!.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder: "produk" }, async (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });

        uploadStream.end(buffer);
      });
      imageUrl = uploadResult.secure_url;
      public_id = uploadResult.public_id;

      const updateWithNewImage = await updateProduct(formData, id, imageUrl, public_id);

      return NextResponse.json({ status: "EDIT SUCCESS", message: "Sukses mengedit produk", data: updateWithNewImage });
    }

    const updateWithOldImage = await updateProduct(formData, id, imageUrl, public_id);
    return NextResponse.json({ status: "EDIT SUCCESS", message: "Sukses mengedit produk", data: updateWithOldImage });
  } catch (err) {
    return NextResponse.json({ message: "Error saat mengedit produk", error: err }, { status: 500 });
  }
};
