import User from "./models/users";
import { connectDB } from "./mongodb";

export const userFetch = async () => {
  try {
    await connectDB();
    const userList = await User.find();
    return userList;
  } catch (error: any) {
    console.log("error:", error);
    return [];
  }
};
