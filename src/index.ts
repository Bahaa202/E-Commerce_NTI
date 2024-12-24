import express, { Application } from "express";
import csurf from "csurf";
import categoriesRouter from "./categories/categories.routes";
import subcategoriesRoute from "./subcategories/subcategories.routes";
import globalErrors from "./middlewares/errors.middleware";
import ApiErrors from "./utils/apiErrors";
import productsRoute from "./products/products.route";
import usersRoute from "./users/users.route";
import authRoute from "./auth/auth.route";
import profileRoute from "./profile/profile.route";
import googleRoute from "./google/google.routes";
import wishlistRoute from "./wishlist/wishlist.routes";
import addressRoute from "./address/address.routes";
import reviewsRoute from "./reviews/reviews.routes";
import copounsRoute from "./copouns/copouns.routes";
import cartRoute from "./cart/cart.routes";
import orderRoute from "./order/order.routes";
import verifyPaymob from "./middlewares/verifyPaymob.middleware";

declare module "express" {
  interface Request {
    filterData?: any;
    files?: any;
    user?: any;
  }
}

const mountRoutes: (app: Application) => void = (app: express.Application) => {
  app.post(
    "/paymob-webhook",
    verifyPaymob,
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (req.body.obj.success === true) {
        // res.redirect(307, `/api/v1/${req.body.obj.payment_key_claims.extra.routeName}`);
        res.redirect(307, `/api/v1/payment`);
      } else {
        return next(new ApiErrors("invalid payment", 403));
      }
    }
  );
  app.use("/auth/google", googleRoute);
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      },
    })
  );
  app.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.cookie("__cookies", req.csrfToken());
      next();
    }
  );
  app.use("/api/v1/categories", categoriesRouter);
  app.use("/api/v1/subcategories", subcategoriesRoute);
  app.use("/api/v1/products", productsRoute);
  app.use("/api/v1/users", usersRoute);
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/profile", profileRoute);
  app.use("/api/v1/wishlist", wishlistRoute);
  app.use("/api/v1/address", addressRoute);
  app.use("/api/v1/reviews", reviewsRoute);
  app.use("/api/v1/copouns", copounsRoute);
  app.use("/api/v1/cart", cartRoute);
  app.use("/api/v1/order", orderRoute);
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
