import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { createProduct } from "@/lib/actions";

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  const file = formData.get("link") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  try {
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ folder: "produk" }, async (error, result) => {
        if (error) {
          reject(error);
        } else {
          try {
            const newProduct = await createProduct(formData, result?.secure_url, result?.public_id);
            resolve(newProduct);
          } catch (err) {
            reject(err);
          }
        }
      });

      uploadStream.end(buffer);
    });

    return NextResponse.json({ status: "SUCCESS", data: uploadResult }, { status: 201 });
  } catch (err) {
    console.error("Upload error: ", err);
    return NextResponse.json({ status: "ERROR", message: "Upload failed" }, { status: 500 });
  }
};
