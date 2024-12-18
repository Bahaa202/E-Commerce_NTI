import express from "express";
import ApiErrors from "../utils/apiErrors";

// Development error handler
const devErrors = (err: any, res: express.Response) => {
  res.status(err.statusCode!).json({
    errors: err,
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

// Production error handler
const prodErrors = (err: any, res: express.Response) => {
  res.status(err.statusCode!).json({
    status: err.status,
    message: err.message,
  });
};

// JWT expired error handler
const handleJwtExpired = (message: string) => {
  return new ApiErrors(message, 401);
};

// Global error handler middleware
const globalErrors = (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";
  if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") err=handleJwtExpired(req.__('session_expired'))
  if (process.env.NODE_ENV === "development")
    devErrors(err, res);
  else
    prodErrors(err, res);
};

export default globalErrors;
