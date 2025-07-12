import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    order_id: String,
    products: [
      {
        product_id: String,
        product_name: String,
        imageUrl: String,
        quantity: Number,
        price: Number,
        subtotal: Number,
      },
    ],
    name: String,
    email: String,
    phone: Number,
    address: String,
    city: String,
    postalCode: String,
    total: Number,
    status: {
      type: String,
      default: "Pending",
    },
    isProcessed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
