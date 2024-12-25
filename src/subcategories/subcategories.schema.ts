import mongoose from "mongoose";
import { ISubcategories } from "./subcategories.interface";

const subcategoriesSchema = new mongoose.Schema<ISubcategories>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
  },
  { timestamps: true }
);

subcategoriesSchema.pre<ISubcategories>(/^find/, function (next) {
  let promise = this.populate({path: "category", select: "_id name image"});
  next();
});

export default mongoose.model<ISubcategories>(
  "Subcategories",
  subcategoriesSchema
);
