import { Schema, model, Types } from "mongoose";
const attendees = new Schema({
  name:{type: String },
  email:{type: String},
  confirmedAt: { type: Date, default: Date.now},
  attendance: {type: Boolean },
  additionalGuests: {type: Number, default: 0}
});
const collection = "events";
const schema = new Schema(
  {
    date: { type: Date, required: true },
    message: { type: String, required: true },
    user_id: {
      type: Types.ObjectId,
      required: true,
      ref: "users",
      index: true,
    },
    place: { type: String, required: true },
    attendees:[attendees]
  },
  { timestamps: true } 
);
schema.pre(/^find/, function () {
  this.populate("user_id", "name phone");
});

const Event = model(collection, schema);

export default Event;
