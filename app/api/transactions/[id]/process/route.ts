import { RouteParams } from "@/lib";
import { Transaction } from "@/lib/models/transactions";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: RouteParams) => {
  await connectDB();
  const { id } = await params;
  try {
    const { isProcessed } = await req.json();

    const updated = await Transaction.findByIdAndUpdate(id, { isProcessed });

    return NextResponse.json({ message: "Status diproses diperbarui", data: updated });
  } catch (err) {
    return NextResponse.json({ message: "Gagal memperbarui", error: err }, { status: 500 });
  }
};
