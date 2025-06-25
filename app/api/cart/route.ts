import { Cart } from "@/lib/models/carts";
import { connectDB } from "@/lib/mongodb";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN!; // bisa ganti pakai env kalau mau

// OPTIONS preflight handler
export const OPTIONS = async () => {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
};

// POST handler cart
export const POST = async (req: NextRequest) => {
  await connectDB();
  try {
    const { sessionId, product, quantity } = await req.json();
    let cart = await Cart.findOne({ userId: sessionId });

    if (!cart) {
      cart = new Cart({
        userId: sessionId,
        products: [
          {
            _id: new Types.ObjectId(),
            productId: product._id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity,
          },
        ],
      });
      await cart.save();
      return NextResponse.json(
        { status: "SUCCESS", message: "Berhasil membuat dan menambahkan cart" },
        {
          status: 201,
          headers: {
            "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          },
        }
      );
    } else {
      const existingProduct = cart.products.find((p) => p.productId.toString() === product._id);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({
          _id: new Types.ObjectId(),
          productId: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity,
        });
      }
      await cart.save();
      return NextResponse.json(
        {
          message: "Berhasil menambahkan produk ke cart",
          status: "SUCCESS",
        },
        {
          status: 201,
          headers: {
            "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          },
        }
      );
    }
  } catch (err) {
    console.log("Error saat menyimpan cart: ", err);
    return NextResponse.json(
      {
        message: "Error menyimpan cart",
        status: "FAILED",
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
