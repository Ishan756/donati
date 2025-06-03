import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/utils/db"; // Utility function for DB connection
import User from "@/models/User"; // Correct import for User model
import Payment from "@/models/Payment"; // Correct import for Payment model

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        await connectDB(); // Connect to MongoDB

        const existingUser = await User.findOne({ email: profile.email });

        if (!existingUser) {
          const newUser = new User({
            email: profile.email,
            username: profile.email.split("@")[0],
          });
          await newUser.save();
          user.name = newUser.username;
        } else {
          user.name = existingUser.username;
        }
      }
      return true;
    },

    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },

    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
