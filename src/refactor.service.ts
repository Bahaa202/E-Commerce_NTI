import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose, { model } from "mongoose";
import ApiErrors from "./utils/apiErrors";

class RefactorService {
  // Get All Categories
  getAll = <modelType>(model: mongoose.Model<any>) =>
    expressAsyncHandler(
      async (req: Request, res: Response, next: NextFunction) => {
        let filterData: any = {};
        if (req.filterData) filterData = req.filterData;
        const documents: modelType[] = await model.find(filterData);
        res.status(200).json({ data: documents });
      }
    );

  // Create a new Category
  createOne = <modelType>(model: mongoose.Model<any>) =>
    expressAsyncHandler(
      async (req: Request, res: Response, next: NextFunction) => {
        const document: modelType = await model.create(req.body);
        res.status(201).json({ data: document });
      }
    );

  // Get One Category
  getOne = <modelType>(model: mongoose.Model<any>) =>
    expressAsyncHandler(
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        const document: modelType | null = await model.findById(req.params.id);
        if (!document)
          return next(new ApiErrors(`${req.__("not_found")}`, 400));
        res.status(200).json({ data: document });
      }
    );

  // Update Category
  updateOne = <modelType>(model: mongoose.Model<any>) =>
    expressAsyncHandler(
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        const document: modelType | null = await model.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );
        if (!document)
          return next(new ApiErrors(`${req.__("not_found")}`, 400));
        res.status(200).json({ data: document });
      }
    );

  // Delete Category
  deleteOne = <modelType>(model: mongoose.Model<any>) =>
    expressAsyncHandler(
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        const document: modelType | null = await model.findByIdAndDelete(
          req.params.id
        );
        if (!document)
          return next(new ApiErrors(`${req.__("not_found")}`, 400));
        res.status(200).json();
      }
    );
}

const refactorService = new RefactorService();
export default refactorService;
