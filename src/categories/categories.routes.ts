import { Router } from "express";
import categoriesService from "./categories.service";
import subcategoriesRouter from "../subcategories/subcategories.routes";

const categoriesRouter: Router = Router();

categoriesRouter.use("/:categoryId/subcategories", subcategoriesRouter);

categoriesRouter
  .route("/")
  .get(categoriesService.getAllCategories)
  .post(categoriesService.createCategory);

categoriesRouter
  .route("/:id")
  .get(categoriesService.getOneCategory)
  .put(categoriesService.updateCategory)
  .delete(categoriesService.deleteCategory);

export default categoriesRouter;
