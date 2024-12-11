import express, { Application } from "express";
import categoriesRouter from "./categories/categories.routes";
import subcategoriesRouter from "./subcategories/subcategories.routes";
import globalErrors from "./middlewares/errors.middleware";
import ApiErrors from "./utils/apiErrors";
import productsRoute from "./products/products.route";
import usersRoute from "./users/users.route";

declare module "express" {
  interface Request {
    filterData?: any;
    files?: any;
    user?: any;
  }
}

const mountRoutes: (app: Application) => void = (app: express.Application) => {
  app.use("/api/v1/categories", categoriesRouter);
  app.use("/api/v1/subcategories", subcategoriesRouter);
  app.use("/api/v1/products", productsRoute);
  app.use("/api/v1/users", usersRoute);
  app.all(
    "*",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      next(new ApiErrors(`route ${req.originalUrl} not found`, 400));
    }
  );
  app.use(globalErrors);
};

export default mountRoutes;
