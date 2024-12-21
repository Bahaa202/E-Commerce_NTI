import { body, param } from "express-validator";
import validatorMiddleware from "../middlewares/validator.middleware";
import orderSchema from "./order.schema";

class OrderValidation {
  createOne = [
    body("name")
      .notEmpty()
      .withMessage((val, { req }) => req.__("validation_field"))
      .isLength({ min: 2, max: 50 })
      .withMessage((val, { req }) => req.__("validation_length_short"))
      .custom(async (val: string, { req }) => {
        const category = await orderSchema.findOne({ name: val });
        if (category) throw new Error(`${req.__("validation_value")}`);
        return true;
      }),
    validatorMiddleware,
  ];
  updateOne = [
    param("id")
      .isMongoId()
      .withMessage((val, { req }) => req.__("invalid_id")),
    body("name")
      .optional()
      .isLength({ min: 2, max: 50 })
      .withMessage((val, { req }) => req.__("validation_length_short"))
      .custom(async (val: string, { req }) => {
        const category = await orderSchema.findOne({ name: val });
        if (category && category._id!.toString() !== req.params?.id.toString())
          throw new Error(`${req.__("validation_value")}`);
        return true;
      }),
    validatorMiddleware,
  ];
  getOne = [
    param("id")
      .isMongoId()
      .withMessage((val, { req }) => req.__("invalid_id")),
    validatorMiddleware,
  ];
  deleteOne = [
    param("id")
      .isMongoId()
      .withMessage((val, { req }) => req.__("invalid_id")),
    validatorMiddleware,
  ];
}

const orderValidation = new OrderValidation();

export default orderValidation;
