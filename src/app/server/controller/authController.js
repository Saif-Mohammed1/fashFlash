import User from "../models/user.model";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { sign, verify } from "jsonwebtoken";
import { promisify } from "util";

import AppError from "@/component/util/appError";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Email } from "@/component/util/email";

const signToken = (id) => {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const createSendToken = (user, statusCode, req, message = false) => {
  const token = signToken(user?._id);

  cookies().set("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // httpOnly: true,
    httpOnly: true,
    // secure: req?.secure || req?.headers["x-forwarded-proto"] === "https",
    secure: true,
    // sameSite: "None", // or "None" if using HTTPS in development
    // domain: "localhost", // or your specific development domain
  });

  // Remove password from output
  // user.password = undefined;

  let userData = {};
  userData.user = {
    _id: user._id,
    name: user.name,
    email: user.email,
    emailVerify: user.emailVerify,
    // password: user.password,
    photo: user.photo,
    role: user.role,
    createdAt: user.createdAt,
  };
  return {
    message:
      (message &&
        "User created successfully. Check your email for verification.") ||
      undefined,
    data: userData,
    token,
    statusCode,
  };
};
export const isAuth = async (req) => {
  let token;
  try {
    if (req?.headers?.get("user-agent") || req?.headers?.get("User-Agent")) {
      const session = await getServerSession(authOptions);
      if (session) {
        //console.log("session isAuth exist");
        const currentUser = await User.findById(session?.user?._id);

        if (!currentUser?.active) {
          throw new AppError(
            "The user belonging to this id does no longer exist?.",
            401
          );
        }
        if (currentUser?.changedPasswordAfter(session?.user?.iat)) {
          throw new AppError(
            "User recently changed password! Please log in again?.",
            401
          );
        }
        return (req.user = session?.user);
      }
    }
    if (
      (req?.headers?.authorization &&
        req?.headers?.authorization?.startsWith("Bearer")) ||
      (req?.headers?.get("authorization") &&
        req?.headers?.get("authorization")?.startsWith("Bearer"))
    ) {
      token =
        req?.headers?.authorization?.split(" ")[1] ||
        req?.headers?.get("authorization")?.split(" ")[1];
    } else {
      //  both work fine cookies()?.get("jwt")?.value|| req?.cookies?.get("jwt")?.value

      token = cookies()?.get("jwt")?.value || req?.cookies?.get("jwt")?.value;
    }
    //console.log("token", token);
    if (!token)
      throw new AppError(
        "You are not logged in! Please log in to get access?.",
        401
      );

    const decode = await promisify(verify)(token, process?.env?.JWT_SECRET);
    //console.log("decode", decode);
    if (!decode) {
      throw new AppError("invalid jwt", 400);
    }
    const currentUser = await User.findById(decode?.id);
    //console.log("currentUser", currentUser);

    if (!currentUser) {
      throw new AppError(
        "The user belonging to this token does no longer exist?.",
        401
      );
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser?.changedPasswordAfter(decode?.iat)) {
      throw new AppError(
        "User recently changed password! Please log in again?.",
        401
      );
    }

    req.user = currentUser;

    // return NextResponse?.next();
  } catch (error) {
    throw error;
    // NextResponse?.json({ message: "unex" }, { status: 500 });
  }
};
export const restrictTo = async (req, ...roles) => {
  // roles ['admin', 'lead-guide']?. role='user'
  if (!roles?.includes(req?.user?.role)) {
    throw new AppError(
      "You do not have permission to perform this action",
      403
    );
  }
  return;
};
export const register = async (req) => {
  let user;
  try {
    const { name, email, password, passwordConfirm } = await req?.json();

    if (!passwordConfirm) {
      throw new AppError("passwordConfirm must be required", 400);
    }
    if (password !== passwordConfirm) {
      throw new AppError("password and passwordConfirm don't match", 400);
    }

    user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    });

    user.generateVerificationCode();
    await user.save();
    // Send the verification email
    await user.sendVerificationCode();

    return createSendToken(user, 201, req, true);
  } catch (error) {
    if (user) {
      await User.findByIdAndDelete(user._id);
    }
    throw error;
  }
};
export const logIn = async (req) => {
  try {
    const { email, password } = await req?.json();
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!user) {
      throw new AppError("Email or Password are incorrect", 400);
    }

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

    const passwordCorrect = await user.CheckPassword(password, user.password);
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
    // Proceed to create and send token for authenticated user
    return createSendToken(user, 200, req);
  } catch (error) {
    throw error;
  }
};

export const logout = async (req) => {
  cookies().set("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  return { data: [], statusCode: 200 };
};
export const forgetPassword = async (req) => {
  let user;
  try {
    const { email } = await req?.json();
    user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // User not found
      throw new AppError("Email does not exist", 400);
    }
    // Check if the user is currently blocked

    // Check if login attempts are already blocked
    if (user.passwordResetBlockedUntil) {
      if (user.passwordResetBlockedUntil < new Date()) {
        user.passwordResetBlockedUntil = undefined;
        await user.save();
      } else {
        throw new AppError(
          "Your Forget Password attempts are currently blocked. Please wait for an hour before attempting again.",
          400
        );
      }
    }
    // Increment password reset attempts counter
    user.passwordResetAttempts = (user.passwordResetAttempts || 0) + 1;
    // await user.save({ validateBeforeSave: false });
    await user.save();
    // If the user has made 5 unsuccessful attempts, block them for 1 hour
    if (user.passwordResetAttempts >= 5) {
      // Block the user for 1 hour
      user.passwordResetBlockedUntil = new Date(Date.now() + 3600000); // 1 hour in milliseconds
      user.passwordResetAttempts = undefined;

      // await user.save({ validateBeforeSave: false });
      await user.save();
      throw new AppError(
        "Too many unsuccessful password reset attempts. Please try again later.",
        400
      );
    }

    // 2) Generate the random reset token
    const createToken = user.createPasswordResetToken();
    // await user.save({ validateBeforeSave: false });
    await user.save();
    await Email(user, createToken);
    return {
      message: "Token sent to email!",
      statusCode: 200,
    };
    // Continue with password reset logic...
  } catch (error) {
    throw error;
  }
};
export const restPassword = async (req) => {
  let user;
  try {
    const { email, token } = await req?.json();
    user = await User.findOne({
      email: email.toLowerCase(),
    });
    if (!user) {
      throw new AppError("User doesn't exist", 404);
    }
    if (user.passwordResetBlockedUntil) {
      if (user.passwordResetBlockedUntil < new Date()) {
        user.passwordResetBlockedUntil = undefined;
        await user.save();
      } else {
        throw new AppError(
          "Your Rest Password attempts are currently blocked. Please wait for an hour before attempting again.",
          400
        );
      }
    }
    if (!user.passwordResetToken) {
      throw new AppError(
        "Your rest password token has been invalid anymore please request new one.",
        400
      );
    }
    if (
      (user.passwordResetExpires && user.passwordResetExpires < new Date()) ||
      (user.passwordResetToken && token !== user.passwordResetToken)
    ) {
      user.passwordResetAttempts = (user.passwordResetAttempts || 0) + 1;
      // await user.save({ validateBeforeSave: false });
      await user.save(); // If the user has made 5 unsuccessful attempts, block them for 1 hour
      if (user.passwordResetAttempts >= 5) {
        // Block the user for 1 hour
        user.passwordResetBlockedUntil = new Date(Date.now() + 3600000); // 1 hour in milliseconds
        user.passwordResetAttempts = undefined;

        // await user.save({ validateBeforeSave: false });
        await user.save();
        throw new AppError(
          "Too many unsuccessful password reset attempts. Please try again later.",
          400
        );
      }
      throw new AppError("Invalid token Or has been expired.", 400);
    }
    return {
      message: "succuss",
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};
export const updatePassword = async (req) => {
  try {
    const { password, confirmPassword, newPassword, email, token } =
      await req.json();

    if (!newPassword) {
      const user = await User.findOne({
        email: email.toLowerCase(),
        passwordResetToken: token,
        passwordResetExpires: { $gt: Date.now() },
      });

      //   const user = await User.findById(req.user.id).select("+password");

      if (!user) {
        //       // User not found
        throw new AppError("User does not exist", 400);
      }
      if (!password || !confirmPassword) {
        throw new AppError("password OR confirmPassword cannot be empty", 400);
      }
      if (password !== confirmPassword) {
        throw new AppError("password and confirmPassword don't match", 400);
      }

      // 3) If so, update password
      user.password = password;
      user.passwordResetExpires = undefined;
      user.passwordResetToken = undefined;
      user.passwordResetAttempts = undefined;
      await user.save();
      // User.findByIdAndUpdate will NOT work as intended!

      // 4) Log user in, send JWT
      return createSendToken(user, 200, req);
    } else {
      const user = await User.findById(req.user._id).select("+password");
      //   const user = await User.findById(req.user.id).select("+password");
      if (!user) {
        //       // User not found
        throw new AppError("User does not exist", 400);
      }

      const CheckPassword = await user.CheckPassword(password, user.password);
      if (!CheckPassword) {
        throw new AppError("password and old password don't match", 400);
      }
      if (newPassword !== confirmPassword) {
        throw new AppError("password and confirmPassword don't match", 400);
      }
      // 3) If so, update password
      user.password = newPassword;
      await user.save();
      // User.findByIdAndUpdate will NOT work as intended!

      // 4) Log user in, send JWT
      return createSendToken(user, 200, req);
    }
  } catch (error) {
    throw error;
  }
};
