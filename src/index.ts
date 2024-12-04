import express, { Application } from "express";
import categoriesRouter from "./categories/categories.routes";
import subcategoriesRouter from "./subcategories/subcategories.routes";
import { Request } from "express";

declare module "express" {
  interface Request {
    filterData?: any;
  }
}

const mountRoutes: (app: Application) => void = (app: express.Application) => {
  app.use("/api/v1/categories", categoriesRouter);
  app.use("/api/v1/subcategories", subcategoriesRouter);
};

export default mountRoutes;
