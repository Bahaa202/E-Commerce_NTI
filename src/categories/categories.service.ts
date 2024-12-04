import { Request, Response, NextFunction } from "express";
import { ICategories } from "./categories.interface";
import categoriesSchema from "./categories.schema";
import expressAsyncHandler from "express-async-handler";
import categoriesRouter from "./categories.routes";

class CategoriesService {
  // Get All Categories
  getAllCategories = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const categories: ICategories[] = await categoriesSchema.find();
      res.status(200).json({ data: categories });
    }
  );

  // Create a new Category
  createCategory = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const category: ICategories = await categoriesSchema.create(req.body);
      res.status(201).json({ data: category });
    }
  );

  // Get One Category
  getOneCategory = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const category: ICategories | null = await categoriesSchema.findById(
        req.params.id
      );
      if (category) {
        res.status(200).json({ data: category });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
      next();
    }
  );

  // Update Category
  updateCategory = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const category: ICategories | null =
        await categoriesSchema.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
      if (category) {
        res.status(200).json({ data: category });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
      next();
    }
  );

  // Delete Category
  deleteCategory = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const category: ICategories | null =
        await categoriesSchema.findByIdAndDelete(req.params.id);
      if (category) {
        res.status(200).json({ message: "Category deleted successfully" });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
      next();
    }
  );
}

const categoriesService = new CategoriesService();
export default categoriesService;
