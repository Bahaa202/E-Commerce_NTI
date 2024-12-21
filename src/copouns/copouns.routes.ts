import { Router } from "express";
import copounsService from "./copouns.service";
import copounsValidation from "./copouns.validation";
import authService from "../auth/auth.services";

const copounsRouter: Router = Router();

copounsRouter.use(
  authService.protectedRoutes,
  authService.checkActive,
  authService.allowedTo("admin")
);

copounsRouter
  .route("/")
  .get(copounsService.getAll)
  .post(copounsValidation.createOne, copounsService.createOne);

copounsRouter
  .route("/:id")
  .get(copounsValidation.getOne, copounsService.getOne)
  .put(copounsService.updateOne, copounsService.updateOne)
  .delete(copounsValidation.deleteOne, copounsService.deleteOne);

export default copounsRouter;
