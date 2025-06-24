import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    order_id: {
      type: String,
      require: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    total: {
      type: Number,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
