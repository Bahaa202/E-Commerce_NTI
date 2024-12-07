import { Document } from "mongoose";
import { ICategories } from "../categories/categories.interface";
import { ISubcategories } from "../subcategories/subcategories.interface";

export interface IProducts extends Document {
  readonly name: string;
  readonly description: string;
  readonly category: ICategories;
  readonly subcategory: ISubcategories;
  readonly price: number;
  readonly discount: number;
  readonly priceAfterDiscount: number;
  readonly quantity: number;
  readonly sold: number;
  readonly rateAvg: number;
  readonly rating: number;
  cover: string;
  images: string[];
}
