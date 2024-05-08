import AppError from "@/component/util/appError";
import User from "../models/user.model";
import { createSendToken } from "./authController";
import { destroyImage } from "@/component/util/cloudinary";
import { UTApi } from "uploadthing/server";

// export const verifyEmail = async (req) => {
//   try {
//     const { verificationCode } = await req.json();
//     //console.log("verificationCode", verificationCode);
//     if (!verificationCode) {
//       throw new AppError("verificationCode must be required", 400);
//     }
//     const user = await User.findOne({
//       verificationCode,
//       verificationCodeExpires: { $gt: Date.now() }, // Ensures the code has not expired
//     });

//     if (!user) {
//       //       // User not found
//       throw new AppError("Invalid or expired verification code.", 400);
//     }

//     user.emailVerify = true;
//     user.verificationCode = undefined;
//     user.verificationCodeExpires = undefined;
//     await user.save();
//     return {
//       message: "Your email has been successfully verified!",

//       statusCode: 200,
//     };
//   } catch (error) {
//     throw error;
//   }
// };

export const sendNewVerificationCode = async (req) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new AppError("User not found.", 404);
    }
    if (
      user.verificationCodeBlockedUntil
      // user.verificationCodeBlockedUntil < new Date()
    ) {
      if (user.verificationCodeBlockedUntil < new Date()) {
        user.verificationCodeBlockedUntil = undefined; // Reset attempts after successful verification
        await user.save();
      } else {
        throw new AppError(
          "Your verification attempts are currently blocked. Please wait for a while before attempting again.",
          400
        );
      }
    }
    if (user.verificationAttempts >= 5) {
      // Check if the number of attempts is exceeded before even checking the code
      user.verificationAttempts = undefined; // Increment attempts on susses
      user.verificationCodeBlockedUntil = new Date(Date.now() + 3600000); // 1 hour in milliseconds
      // await user.save({ validateBeforeSave: false });
      await user.save();
      throw new AppError(
        "Maximum verification attempts exceeded. Please try again later",
        429
      );
    }

    user.generateVerificationCode();
    // Send the verification email
    await user.sendVerificationCode();
    user.verificationAttempts = (user.verificationAttempts || 0) + 1; // Increment attempts on susses

    await user.save();

    return {
      message: "Verification code has been sent to your email!",
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};
export const verifyEmail = async (req) => {
  try {
    const { verificationCode } = await req.json();
    if (!verificationCode) {
      throw new AppError("verification code must be required", 400);
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      throw new AppError("User not found.", 404);
    }
    if (user.verificationCodeBlockedUntil) {
      if (user.verificationCodeBlockedUntil < new Date()) {
        user.verificationCodeBlockedUntil = undefined; // Reset attempts after successful verification
        await user.save();
      } else {
        throw new AppError(
          "Your verification attempts are currently blocked. Please wait for a while before attempting again.",
          400
        );
      }
    }
    // Check if the number of attempts is exceeded before even checking the code
    if (user.verificationAttempts >= 5) {
      user.verificationAttempts = undefined; // Increment attempts on susses
      user.verificationCodeBlockedUntil = new Date(Date.now() + 3600000); // 1 hour in milliseconds
      // await user.save({ validateBeforeSave: false });
      await user.save();
      throw new AppError(
        "Maximum verification attempts exceeded. Please request a new code.",
        429
      );
    }

    // Now check if the provided code matches and is not expired
    if (
      user.verificationCode !== verificationCode ||
      user.verificationCodeExpires < Date.now()
    ) {
      user.verificationAttempts = (user.verificationAttempts || 0) + 1; // Increment attempts on failure
      await user.save();
      throw new AppError("Invalid or expired verification code.", 400);
    }

    // Reset the fields on successful verification
    user.emailVerify = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    user.verificationAttempts = undefined; // Reset attempts after successful verification
    if (user.verificationCodeBlockedUntil) {
      user.verificationCodeBlockedUntil = undefined; // Reset attempts after successful verification
    }
    await user.save();

    return {
      message: "Your email has been successfully verified!",
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};
export const createUserByAdmin = async (req) => {
  let user;
  try {
    const { name, email, password, confirmPassword, role } = await req?.json();

    if (!confirmPassword) {
      throw new AppError("passwordConfirm must be required", 400);
    }
    if (!role) {
      throw new AppError("role must be required", 400);
    }
    if (password !== confirmPassword) {
      throw new AppError("password and passwordConfirm don't match", 400);
    }

    user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role,
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
export const editUserByAdmin = async (req, Model) => {
  try {
    let data = {};
    const { active, role } = await req.json();
    //console.log("active", active);
    //console.log("role", role);

    if (typeof active !== "boolean" && !role) {
      throw new AppError("Please select at least one option.", 400);
    }
    if (typeof active === "boolean") {
      data.active = active;
    }
    if (role) {
      data.role = role;
    }
    //console.log("data", data);
    const doc = await Model.findByIdAndUpdate(
      req.id,

      data,

      {
        new: true,
        runValidators: true,
      }
    );
    if (!doc) {
      throw new AppError("No document found with that ID", 404);
    }

    return { data: doc, statusCode: 200 };
  } catch (error) {
    throw error;
  }
};
export const deleteUserByAdmin = async (req, Model) => {
  try {
    const doc = await Model.findByIdAndDelete(req.id);

    if (!doc) {
      throw new AppError("No document found with that ID", 404);
    }

    return {
      data: null,
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};
export const deleteUser = async (req, Model) => {
  try {
    const doc = await Model.findByIdAndUpdate(
      req.user._id,
      {
        active: false,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!doc) {
      throw new AppError("No document found with that ID", 404);
    }

    return { data: null, statusCode: 200 };
  } catch (error) {
    throw error;
  }
};
export const deleteProductByUser = async (req, Model) => {
  try {
    const doc = await Model.findOne({
      _id: req.id,
      user: req.user._id,
    }); //.select("+public_id");

    if (!doc) {
      throw new AppError("No document found with that ID", 404);
    }
    if (doc.public_id) {
      const utapi = new UTApi();
      for (const public_id of doc.public_id) {
        await utapi.deleteFiles(public_id);

        // for cloudainry
        // await destroyImage(public_id);
      }
    }
    await Model.findByIdAndDelete(req.id); // or Model.findByIdAndDelete(req.params.id) if you prefer

    return { data: null, statusCode: 200 };
  } catch (error) {
    throw error;
  }
};

// export const updatePassword = async (req) => {
//   try {
//     const { password, confirmPassword, newPassword, email } = await req.json();

//     if (!newPassword) {
//       const user = await User.findById({ email });
//       //   const user = await User.findById(req.user.id).select("+password");

//       if (!user) {
//         //       // User not found
//         throw new AppError("User does not exist", 400);
//       }

//       // 3) If so, update password
//       user.password = password;
//       user.passwordConfirm = confirmPassword;
//       await user.save();
//       // User.findByIdAndUpdate will NOT work as intended!

//       // 4) Log user in, send JWT
//       createSendToken(user, 200, req, res);
//     }
//   } catch (error) {

//   }
// };
