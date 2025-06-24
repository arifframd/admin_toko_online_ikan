import { RouteParams } from "@/lib";
import { Cart } from "@/lib/models/carts";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: RouteParams) => {
  await connectDB();
  const { id, productId } = await params;
  try {
    const cart = await Cart.findOne({ userId: id });
    if (!cart) {
      return NextResponse.json(
        {
          message: "Cart tidak ada",
        },
        { status: 500 }
      );
    }

    // filter product cart yang di delete
    cart.products = cart.products.filter((item) => item.productId.toString() !== productId);
    await cart.save();

    return NextResponse.json(
      {
        message: "Berhasil menghapus produk",
        status: "SUCCESS",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Gagal menghapus cart",
        status: "FAILED",
        error: err,
      },
      { status: 500 }
    );
  }
};
