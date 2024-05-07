import { Schema, model, models } from "mongoose";

const AddressSchema = new Schema({
  street: {
    type: String,
    required: [true, "street must be required"],
  },
  city: {
    type: String,
    required: [true, "city must be required"],
  },

  state: {
    type: String,
    required: [true, "state must be required"],
  },
  zipCode: {
    type: Number,
    required: [true, "zipCode must be required"],
  },
  phone: {
    type: String,
    required: [true, "phone must be required"],
    validate: {
      validator: function (v) {
        // Regular expression to match a phone number format
        return /^\+?\d{5,20}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! make sure its include country code`,
    },
  },
  country: {
    type: String,
    required: [true, "country must be required"],
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: [true, "Address must belong to a user."],
  },
});
const Address = models.Address || model("Address", AddressSchema);

export default Address;
