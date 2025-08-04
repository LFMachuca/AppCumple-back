import { Schema, model, Types } from "mongoose";

const collection = "admin";
const schema = new Schema(
    {
        email:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        name:{ type:String},
        role:{
            type: String,
            default:"ADMIN",
            enum:["USER","ADMIN"],
            index:true
        }
    },
    { timestamps: true } 
);

const Admin = model(collection, schema);

export default Admin;