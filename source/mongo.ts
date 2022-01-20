import mongoose from "mongoose";
import { config } from "dotenv";
config();

export = async function () {
  await mongoose.connect(process.env.MONGO_URI!);
  return mongoose;
};
