import { Router } from "express";
import subcategoriesService from "./subcategories.service";

const subcategoriesRouter: Router = Router();

subcategoriesRouter
  .route("/")
  .get(
    subcategoriesService.filterSubcategories,
    subcategoriesService.getAllSubcategories
  )
  .post(
    subcategoriesService.setCategoryId,
    subcategoriesService.createSubcategory
  );

subcategoriesRouter
  .route("/:id")
  .get(subcategoriesService.getOneSubcategory)
  .put(subcategoriesService.updateSubcategory)
  .delete(subcategoriesService.deleteSubcategory);

export default subcategoriesRouter;
