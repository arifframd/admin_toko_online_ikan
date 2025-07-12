import { Schema } from "mongoose";
import mongoose from "mongoose";

const UserInfoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    address: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    postalCode: { type: Number, required: true },
    city: { type: String, required: true },
  },
  { timestamps: true }
);

const UserInfo = mongoose.models.UserInfo || mongoose.model("UserInfo", UserInfoSchema);
export default UserInfo;
