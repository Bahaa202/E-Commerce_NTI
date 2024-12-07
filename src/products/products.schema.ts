import mongoose from "mongoose";
import { IProducts } from "./products.interface";

const productsSchema = new mongoose.Schema<IProducts>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "subcategories" },
    price: { type: Number, required: true },
    discount: { type: Number },
    priceAfterDiscount: { type: Number },
    quantity: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    rateAvg: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    cover: String,
    images: [String],
  },
  { timestamps: true }
);

productsSchema.pre<IProducts>(/^find/, function (next) {
  this.populate({ path: "subcategory", select: "name image" });
  next();
});

export default mongoose.model<IProducts>("products", productsSchema);