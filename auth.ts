import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { connectDB } from "./lib/mongodb";
import User from "./lib/models/users";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });

      return !!existingUser;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        // cek apakah user ada
        await connectDB();
        const existingUser = await User.findOne({ email: profile.email });
        // set token.id dengan user.id
        token.id = existingUser._id.toString();
      }

      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
