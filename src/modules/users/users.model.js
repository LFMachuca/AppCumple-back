import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    birthday: { type: Date, required: true },
  },
  { timestamps: true }
);

const User = model(collection, schema);

export default User;
