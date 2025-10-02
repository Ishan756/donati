import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import connectDB from "@/utils/db"; // Utility function for DB connection
import User from "@/models/User"; // Correct import for User model
import Payment from "@/models/Payment"; // Correct import for Payment model

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google" || account.provider === "github") {
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
      
      // Ensure user image and name are properly set
      if (token?.picture) {
        session.user.image = token.picture;
      }
      if (token?.name) {
        session.user.name = token.name;
      }
      
      return session;
    },

    async jwt({ token, account, user, profile }) {
      if (account && user) {
        token.accessToken = account.access_token;
        
        // Store user image and profile data in token
        if (profile?.avatar_url) { // GitHub
          token.picture = profile.avatar_url;
        } else if (profile?.picture) { // Google
          token.picture = profile.picture;
        }
        
        if (profile?.name) {
          token.name = profile.name;
        } else if (profile?.login) { // GitHub username
          token.name = profile.login;
        }
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
