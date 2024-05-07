import AppError from "@/component/util/appError";
import User from "../models/user.model";

export const createUserOrder = async (req, Model) => {
  let doc;

  try {
    let { email, invoiceId, invoiceLink } = await req.json();

    if (!email || !invoiceId || !invoiceLink) {
      throw new AppError("You Need to provide  data", 400);
    }
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw new AppError("user is invalid ", 400);
    }
    doc = await Model.create({
      user: user._id,

      invoiceId,
      invoiceLink,
    });

    return {
      data: doc,
      statusCode: 201,
    };
  } catch (error) {
    if (doc) {
      await Model.findByIdAndDelete(doc._id);
    }
    throw error;
  }
};
