import { Product } from "@/lib/models/products";
import { Transaction } from "@/lib/models/transactions";
import { connectDB } from "@/lib/mongodb";
import { notifyAdmin } from "@/lib/notifyAdmin";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  // TODO: update stutus transaksi berdasarkan url notification hooks dari midtrans
  const { order_id, transaction_status } = await req.json();
  console.log("order id ", order_id);

  try {
    await connectDB();

    // upadate status transaksi
    const updateStatus = await Transaction.findOneAndUpdate({ order_id }, { status: transaction_status }, { new: true });

    if (!updateStatus) {
      console.log("❌ Gagal update, order_id tidak ditemukan");
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if (updateStatus.status !== "settlement") {
      console.log("🟡 Status belum settlement, tidak kirim notifikasi admin");
      return NextResponse.json({ message: "Notify admin belum terkirim" }, { status: 200 });
    }

    console.log("✅ Settlement! Kirim notifikasi admin...");

    // update stok produk
    const stok = await Product.findOneAndUpdate({ name: updateStatus.product_name }, { $inc: { stock: -updateStatus.quantity } }, { new: true });
    if (!stok) {
      console.log("❌ Gagal update stok");
      return NextResponse.json({ message: "Gagal mengupdate stok" }, { status: 404 });
    }
    console.log("Stok produk setelah update:", stok.stock);
    // kirim notifikasi ke admin
    await notifyAdmin({
      name: updateStatus.name,
      productName: updateStatus.product_name,
      quantity: updateStatus.quantity,
      address: updateStatus.address,
      order_id: updateStatus.order_id,
    });

    return NextResponse.json({ message: "Transaction updated", data: updateStatus }, { status: 200 });
  } catch (err) {
    console.log("err", err);
    return NextResponse.json(
      {
        success: false,
        message: "Error dalam membuat transaksi",
      },
      {
        status: 500,
      }
    );
  }
};
