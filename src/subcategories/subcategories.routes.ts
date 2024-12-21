import { Router } from "express";
import subcategoriesService from "./subcategories.service";
import subcategoriesValidation from "./subcategories.validation";
import authService from "../auth/auth.services";

const subcategoriesRouter: Router = Router({ mergeParams: true });

subcategoriesRouter
  .route("/")
  .get(
    subcategoriesService.filterSubcategories,
    subcategoriesService.getAllSubcategories
  )
  .post(
    authService.protectedRoutes,
    authService.checkActive,
    authService.allowedTo("admin"),
    subcategoriesService.setCategoryId,
    subcategoriesValidation.createOne,
    subcategoriesService.createSubcategory
  );

subcategoriesRouter
  .route("/:id")
  .get(subcategoriesValidation.getOne, subcategoriesService.getOneSubcategory)
  .put(
    authService.protectedRoutes,
    authService.checkActive,
    authService.allowedTo("admin"),
    subcategoriesValidation.updateOne,
    subcategoriesService.updateSubcategory
  )
  .delete(
    authService.protectedRoutes,
    authService.checkActive,
    authService.allowedTo("admin"),
    subcategoriesValidation.deleteOne,
    subcategoriesService.deleteSubcategory
  );

export default subcategoriesRouter;
