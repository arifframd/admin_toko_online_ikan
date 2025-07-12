import { createTransaction } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Midtrans = require("midtrans-client");

// Ganti dengan env pas production
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN!;

// OPTIONS preflight
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

// 👉 Handle POST
export async function POST(req: NextRequest) {
  try {
    const { id, nameBuyer, email, phone, address, city, postalCode, products } = await req.json();

    const total = products.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0);

    const item_details = products.map((item: any) => ({
      id: item.product_id,
      name: item.product_name,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    }));
    const fullName = nameBuyer;
    const nameParts = fullName.trim().split(" ");
    const first_name = nameParts[0];
    const last_name = nameParts.slice(1).join(" ");

    console.log("🔍 Received payload:", { id, item_details });

    const snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: process.env.SECRET_SERVER_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: id,
        gross_amount: total,
      },
      item_details,
      customer_details: {
        first_name,
        last_name,
        email,
        phone,
        shipping_address: {
          address,
          city,
          postal_code: postalCode,
        },
      },
    };

    const transaction = await snap.createTransaction(parameter);

    await createTransaction({
      order_id: id,
      products,
      email,
      phone,
      city,
      postalCode,
      name: fullName,
      address,
      total,
    });

    console.log("✅ Transaction created:", transaction);

    return NextResponse.json(
      {
        token: transaction.token,
        paymentUrl: transaction.redirect_url,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    console.error("❌ Transaction error:", error);
    return NextResponse.json(
      {
        message: "Transaction failed",
        error: error,
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}
