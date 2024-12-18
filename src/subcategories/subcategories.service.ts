import { Request, Response, NextFunction } from "express";
import { ISubcategories } from "./subcategories.interface";
import subcategoriesSchema from "./subcategories.schema";
import refactorService from "../refactor.service";

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
  getAllSubcategories =
    refactorService.getAll<ISubcategories>(subcategoriesSchema);

  // Create a new Subcategory
  createSubcategory =
    refactorService.createOne<ISubcategories>(subcategoriesSchema);

  // Get One Subcategory
  getOneSubcategory =
    refactorService.getOne<ISubcategories>(subcategoriesSchema);

  // Update Subcategory
  updateSubcategory =
    refactorService.updateOne<ISubcategories>(subcategoriesSchema);

  // Delete Subcategory
  deleteSubcategory =
    refactorService.deleteOne<ISubcategories>(subcategoriesSchema);
}

const subcategoriesService = new SubcategoriesService();

export default subcategoriesService;
