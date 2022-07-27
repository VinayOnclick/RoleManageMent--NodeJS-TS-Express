import * as mongoose from "mongoose";
import { model } from "mongoose";

const registerSchema = new mongoose.Schema({
  email: { type: String, },
  password: { type: String, },
  firstName: { type: String, },
  lastName: { type: String,},
  age: { type: Number, },
  phone: { type: String, },
  address: { type: String, },
  role:{type:String,default:"",enum:["","Guest","SuperAdmin","Admin","Employee","Manager"]},
  image:{
    type:Object,
  
    }
});

export default model("user", registerSchema)