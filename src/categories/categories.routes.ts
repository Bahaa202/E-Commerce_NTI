import { Router } from "express";
import categoriesService from "./categories.service";
import subcategoriesRouter from "../subcategories/subcategories.routes";
import categoriesValidation from "./categories.validation";

const categoriesRouter: Router = Router();

categoriesRouter.use("/:categoryId/subcategories", subcategoriesRouter);

categoriesRouter
  .route("/")
  .get(categoriesService.getAllCategories)
  .post(categoriesValidation.createOne, categoriesService.createCategory);

categoriesRouter
  .route("/:id")
  .get(categoriesValidation.getOne, categoriesService.getOneCategory)
  .put(categoriesValidation.updateOne, categoriesService.updateCategory)
  .delete(categoriesValidation.deleteOne, categoriesService.deleteCategory);

export default categoriesRouter;
