import mongoose from "mongoose";
import { ICopouns } from "./copouns.interface";

const copounsSchema = new mongoose.Schema<ICopouns>(
  {
    name: { type: String },
    discount: { type: Number },
    expireTime: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<ICopouns>("copouns", copounsSchema);
