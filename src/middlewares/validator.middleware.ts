import { NextFunction, Response, Request, RequestHandler } from "express";
import { validationResult } from "express-validator";

const validatorMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  } else {
    next();
  }
};

export default validatorMiddleware;
