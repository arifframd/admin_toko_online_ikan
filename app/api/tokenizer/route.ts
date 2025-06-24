import { createTransaction } from "@/lib/actions";
import { NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Midtrans = require("midtrans-client");

// Handle POST
export async function POST(req: NextResponse) {
  try {
    const { id, quantity, price, imageUrl, productName, nameBuyer, email, phone, address, city, postalCode } = await req.json();
    const totalPrice = price * quantity;
    const fullName = nameBuyer;
    const nameParts = fullName.trim().split(" ");

    const first_name = nameParts[0];
    const last_name = nameParts.slice(1).join(" "); // Kalau ada lebih dari dua kata

    console.log("🔍 Received payload:", { id, quantity, price, productName });

    const snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: process.env.SECRET_SERVER_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: id,
        gross_amount: totalPrice,
      },
      item_details: [
        {
          id,
          name: productName,
          price,
          quantity,
        },
      ],
      customer_details: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        shipping_address: {
          address: address,
          city: city,
          postal_code: postalCode,
        },
      },
    };

    const transaction = await snap.createTransaction(parameter);
    // Simpan data produk yang ingin dibeli
    await createTransaction({ order_id: id, imageUrl: imageUrl, product_name: productName, name: fullName, total: totalPrice, quantity, address });
    console.log("✅ Transaction created:", transaction);

    return NextResponse.json(
      {
        token: transaction.token,
        paymentUrl: transaction.redirect_url,
      },
      {
        status: 200,
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
      }
    );
  }
}
