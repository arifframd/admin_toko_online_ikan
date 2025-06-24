import { RouteParams } from "@/lib";
import { Cart } from "@/lib/models/carts";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: RouteParams) => {
  const { id } = await params;

  await connectDB();

  try {
    const cart = await Cart.findOne({ userId: id });
    if (!cart) {
      return NextResponse.json(
        {
          message: "Belum ada keranjang",
          status: "SUCCESS",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(cart);
  } catch (err) {
    return NextResponse.json(
      {
        message: "Gagal mendapatkan cart",
        status: "FAILED",
        error: `Error: ${err}`,
      },
      { status: 500 }
    );
  }
};
