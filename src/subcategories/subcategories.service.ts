import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import { ISubcategories } from "./subcategories.interface";
import subcategoriesSchema from "./subcategories.schema";

class SubcategoriesService {
  setCategoryId(req: Request, res: Response, next: NextFunction) {
    if (req.params.categoryId && !req.body.category)
      req.body.category = req.params.categoryId;
    next();
  }
  filterSubcategories(req: Request, res: Response, next: NextFunction) {
    const filterData: any = {};
    if (req.params.categoryId) filterData.category = req.params.categoryId;
    req.filterData = filterData;
    next();
  }
  // Get All Subcategories
  getAllSubcategories = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let filterData: any = {};
      if (req.filterData) filterData = req.filterData;
      const subcategories: ISubcategories[] = await subcategoriesSchema.find(
        filterData
      );
      res.status(200).json({ data: subcategories });
    }
  );

  // Create a new Subcategory
  createSubcategory = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const subcategories: ISubcategories | null =
        await subcategoriesSchema.create(req.body);
      res.status(201).json({ data: subcategories });
    }
  );

  // Get One Subcategory
  getOneSubcategory = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const subcategory: ISubcategories | null =
        await subcategoriesSchema.findById(req.params.id);
      if (subcategory) {
        res.status(200).json({ data: subcategory });
      } else {
        res.status(404).send({ message: "Subcategory not found" });
      }
      next();
    }
  );

  // Update Subcategory
  updateSubcategory = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const updatedSubcategory: ISubcategories | null =
        await subcategoriesSchema.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
      if (updatedSubcategory) {
        res.status(200).json({ data: updatedSubcategory });
      } else {
        res.status(404).send({ message: "Subcategory not found" });
      }
      next();
    }
  );

  // Delete Subcategory
  deleteSubcategory = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const deletedSubcategory: ISubcategories | null =
        await subcategoriesSchema.findByIdAndDelete(req.params.id);
      if (deletedSubcategory) {
        res.status(200).json({ message: "Subcategory deleted successfully" });
      } else {
        res.status(404).send({ message: "Subcategory not found" });
      }
      next();
    }
  );
}

const subcategoriesService = new SubcategoriesService();

export default subcategoriesService;
