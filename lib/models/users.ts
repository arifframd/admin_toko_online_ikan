import { Schema } from "mongoose";
import mongoose from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    image: { type: String },
    role: { type: String, default: "user" }, // bisa jadi 'admin' juga
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
