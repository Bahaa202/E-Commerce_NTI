import { ICategories } from "../categories/categories.interface";
import { Document } from "mongoose";

export interface ISubcategories extends Document {
  readonly name: string;
  readonly category: ICategories;
  image: string;
}
