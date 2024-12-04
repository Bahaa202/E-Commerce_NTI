import mongoose from "mongoose";
import { ICategories } from "./categories.interface";

const CategoriesSchema = new mongoose.Schema<ICategories>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Categories", CategoriesSchema);
