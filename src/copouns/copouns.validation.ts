import { body, param } from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";

class CopounsValidation {
  createOne = [
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 3, max: 50 })
      .withMessage("name is required"),

    body("discount")
      .notEmpty()
      .withMessage("discount is required")
      .isFloat({ min: 1, max: 100 })
      .withMessage("discount is required"),

    body("expireTime")
      .notEmpty()
      .withMessage("expireTime is required")
      .isDate()
      .withMessage("expireTime is required"),
    validatorMiddleware,
  ];
  updateOne = [
    param("id").isMongoId().withMessage("Invalid id"),
    body("name")
      .optional()
      .isLength({ min: 3, max: 50 })
      .withMessage("name is required"),
    body("discount")
      .optional()
      .isFloat({ min: 1, max: 100 })
      .withMessage("discount is required"),
    body("expireTime")
      .optional()
      .isDate()
      .withMessage("expireTime is required"),
    validatorMiddleware,
  ];
  getOne = [
    param("id").isMongoId().withMessage("Invalid id"),
    validatorMiddleware,
  ];
  deleteOne = [
    param("id").isMongoId().withMessage("Invalid id"),
    validatorMiddleware,
  ];
}

const copounsValidation = new CopounsValidation();
export default copounsValidation;
