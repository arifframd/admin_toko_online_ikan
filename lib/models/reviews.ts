import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

export const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
