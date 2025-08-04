import { Schema, model, Types } from "mongoose";
const collection = "events";
const schema = new Schema(
  {
    title:{type: String, required:true},
    date: { type: Date, required: true },
    message: { type: String},
    place: { type: String, required: true },
    createdBy: { type: Types.ObjectId, ref:'admin', required:true},
    createdAt:{type: Date, default:Date.now}
  },
  { timestamps: true } 
);
schema.pre(/^find/, function () {
  this.populate("createdBy","name");
});

const Event = model(collection, schema);

export default Event;
