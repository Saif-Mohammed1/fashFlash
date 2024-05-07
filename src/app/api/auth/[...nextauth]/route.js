import { connectDB } from "@/app/server/db/db";
import User from "@/app/server/models/user.model";
import AppError from "@/component/util/appError";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        try {
          await connectDB();
          const { password, email } = credentials;

          const user = await User.findOne({
            email: email.toLowerCase(),
          }).select("+password");
          if (!user)
            throw new AppError("Email OR Password are not correct", 400);
          // Check if login attempts are already blocked
          if (user.passwordLoginBlockedUntil) {
            if (user.passwordLoginBlockedUntil < new Date()) {
              user.passwordLoginBlockedUntil = undefined;
              await user.save();
            } else {
              throw new AppError(
                "Your logIn attempts are currently blocked. Please wait for an hour before attempting again.",
                400
              );
            }
          }

          const passwordCorrect = await user.CheckPassword(
            password,
            user.password
          );
          if (!passwordCorrect) {
            user.passwordLoginAttempts = (user.passwordLoginAttempts || 0) + 1;
            // await user.save({ validateBeforeSave: false });
            await user.save();

            // Block the user after 3 unsuccessful attempts
            if (user.passwordLoginAttempts >= 3) {
              user.passwordLoginAttempts = undefined;

              user.passwordLoginBlockedUntil = new Date(Date.now() + 3600000); // 1 hour in milliseconds
              // await user.save({ validateBeforeSave: false });
              await user.save();
              throw new AppError(
                "Too many unsuccessful password attempts. Please try again later.",
                400
              );
            }
            throw new AppError("Email or Password are incorrect", 400);
          }
          // }

          // Reset counters on successful login
          user.passwordLoginAttempts = undefined;
          user.passwordLoginBlockedUntil = undefined;
          // await user.save({ validateBeforeSave: false });
          await user.save();

          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            emailVerify: user.emailVerify,
            // password: user.password,
            photo: user.photo,
            role: user.role,
            createdAt: user.createdAt,
          };
        } catch (error) {
          /*return NextResponse.json({
                ...error
            })*/
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        ///this use to make sure server is updated in serverside
        return { ...token, ...session.user };
      }

      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      // if (session.user) session.user = token.user;
      if (session.user) session.user = token;

      return session;
    },
  },
  pages: { signIn: "/auth/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
