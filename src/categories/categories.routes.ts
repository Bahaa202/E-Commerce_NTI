import { Router } from "express";
import categoriesService from "./categories.service";
import subcategoriesRoute from "../subcategories/subcategories.routes";
import categoriesValidation from "./categories.validation";
import authService from "../auth/auth.services";

const categoriesRouter: Router = Router();

categoriesRouter.use("/:categoryId/subcategories", subcategoriesRoute);

categoriesRouter
  .route("/")
  .get(categoriesService.getAllCategories)
  .post(
    authService.protectedRoutes,
    authService.checkActive,
    authService.allowedTo("admin"),
    categoriesValidation.createOne,
    categoriesService.createCategory
  );

categoriesRouter
  .route("/:id")
  .get(categoriesValidation.getOne, categoriesService.getOneCategory)
  .put(
    authService.protectedRoutes,
    authService.checkActive,
    authService.allowedTo("admin"),
    categoriesValidation.updateOne,
    categoriesService.updateCategory
  )
  .delete(
    authService.protectedRoutes,
    authService.checkActive,
    authService.allowedTo("admin"),
    categoriesValidation.deleteOne,
    categoriesService.deleteCategory
  );

export default categoriesRouter;
