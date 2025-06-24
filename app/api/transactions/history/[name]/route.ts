import { RouteParams } from "@/lib";
import { Transaction } from "@/lib/models/transactions";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: RouteParams) => {
  const { name } = await params;
  const decodeName = decodeURIComponent(name);
  console.log(decodeName);
  try {
    await connectDB();
    const history = await Transaction.find({ name: decodeName });
    if (!history) {
      return NextResponse.json(
        {
          message: "Tidak ada riwayat order",
          status: "SUCCESS",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        message: "Berhasil mengambil riwayat order",
        status: "SUCCESS",
        data: history,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Gagal mendapatkan riwayat order",
        status: "FAILED",
        error: err,
      },
      {
        status: 500,
      }
    );
  }
};
