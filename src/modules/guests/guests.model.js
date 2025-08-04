import { Schema, model, Types } from "mongoose";

const collection = "guest";
const schema = new Schema(
    {
        eventId:{type: Types.ObjectId, ref:"events"},
        name:{type:String, required:true},
        phone:{type:String, required:true},
        birthdate:{type: Date, required:true},
        terms:{ type:Boolean, required:true, default:false},
        confirmedAt:{type:Date, default: Date.now}
    },
    { timestamps: true } 
);
schema.pre(/^find/, function () {
    this.populate("eventId","title date place");
  });
const Guest = model(collection, schema);

export default Guest
