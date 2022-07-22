import * as mongoose from "mongoose";
import { model } from "mongoose";
const testSchema = new mongoose.Schema({

  image:{
    type:Object,
  required:true
    }
});
export default model("test", testSchema)