import { Router } from "express";
import subcategoriesService from "./subcategories.service";
import subcategoriesValidation from "./subcategories.validation";

const subcategoriesRouter: Router = Router({ mergeParams: true });

subcategoriesRouter
  .route("/")
  .get(
    subcategoriesService.filterSubcategories,
    subcategoriesService.getAllSubcategories
  )
  .post(
    subcategoriesService.setCategoryId,
    subcategoriesValidation.createOne,
    subcategoriesService.createSubcategory
  );

subcategoriesRouter
  .route("/:id")
  .get(subcategoriesValidation.getOne, subcategoriesService.getOneSubcategory)
  .put(
    subcategoriesValidation.updateOne,
    subcategoriesService.updateSubcategory
  )
  .delete(
    subcategoriesValidation.deleteOne,
    subcategoriesService.deleteSubcategory
  );

export default subcategoriesRouter;
