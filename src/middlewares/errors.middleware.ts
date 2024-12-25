import express from "express";
import ApiErrors from "../utils/apiErrors";

// Development error handler
const devErrors = (err: any, res: express.Response) => {
  const statusCode = err.statusCode || 500; // Ensure a valid status code
  res.status(statusCode).json({
    errors: err,
    status: err.status || "Error",
    message: err.message || "An error occurred",
    stack: err.stack,
  });
};

// Production error handler
const prodErrors = (err: any, res: express.Response) => {
  const statusCode = err.statusCode || 500; // Ensure a valid status code
  res.status(statusCode).json({
    status: err.status || "Error",
    message: err.message || "Something went wrong",
  });
};

// JWT expired error handler
const handleJwtExpired = (message: string) => {
  return new ApiErrors(message, 401); // Ensure statusCode is always 401
};

// Global error handler middleware
const globalErrors = (
  err: any,
  req: express.Request,
  res: express.Response,
) => {
  err.statusCode = err.statusCode || 500; // Default statusCode to 500
  err.status = err.status || "Error"; // Default status to "Error"

  // Handle JWT errors
  if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
    err = handleJwtExpired(req.__("session_expired"));
  }

  // Use environment to determine error handling
  const env = process.env.NODE_ENV || "development"; // Fallback to "development"
  if (env === "development") {
    devErrors(err, res);
  } else {
    prodErrors(err, res);
  }
};

export default globalErrors;
