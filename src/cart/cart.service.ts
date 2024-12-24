import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import cartSchema from "./cart.schema";
import ApiErrors from "../utils/apiErrors";
import { CartItems, ICarts } from "./cart.interface";
import productsSchema from "../products/products.schema";
import copounsSchema from "../copouns/copouns.schema";

class CartService {
  getCart = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const cart = await cartSchema.findOne({ user: req.user._id });
      if (!cart) return next(new ApiErrors("your cart is empty", 404));
      res.status(200).json({ length: cart?.items.length, data: cart });
    }
  );

  addToCart = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const product = await productsSchema.findById(req.body.product);
      if (!product) return next(new ApiErrors(`${req.__("not_found")}`, 404));
      let cart: any = await cartSchema.findOne({ user: req.user._id });
      if (!cart) {
        cart = await cartSchema.create({
          user: req.user._id,
          items: [
            {
              product: product._id,
              price: product.priceAfterDiscount
                ? product.priceAfterDiscount
                : product.price,
            },
          ],
        });
      } else {
        const productIndex = cart.items.findIndex(
          (item: CartItems) =>
            item.product._id!.toString() === product._id!.toString()
        );
        if (productIndex > -1) {
          cart.items[productIndex].quantity += 1;
        } else {
          cart.items.push({
            product: product._id,
            price: product.priceAfterDiscount
              ? product.priceAfterDiscount
              : product.price,
            quantity: 1,
          });
        }
      }
      this.calcTotalPrice(cart);
      await cart.save();
      res.status(200).json({ length: cart.items.length, data: cart });
    }
  );
  removeFromCart = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const cart = await cartSchema.findOneAndUpdate(
        { user: req.user._id },
        {
          $pull: { items: { _id: req.params.itemId } },
        },
        { new: true }
      );
      if (!cart) return next(new ApiErrors("your cart is empty", 404));
      this.calcTotalPrice(cart);
      await cart.save();
      res.status(200).json({ length: cart?.items.length, data: cart });
    }
  );

  clearCart = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const cart = await cartSchema.findOneAndDelete({ user: req.user._id });
      if (!cart) return next(new ApiErrors("your cart is empty", 404));
      res.status(204).json({});
    }
  );

  updateQuantity = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let cart: any = await cartSchema.findOne({ user: req.user._id });
      if (!cart) return next(new ApiErrors("your cart is empty", 404));
      const productIndex = cart.items.findIndex(
        (item: CartItems) =>
          item._id!.toString() === req.params.itemId.toString()
      );
      if (productIndex > -1) {
        cart.items[productIndex].quantity = req.body.quantity;
      } else {
        return next(new ApiErrors(`${req.__("not_found")}`, 404));
      }
      this.calcTotalPrice(cart);
      await cart.save();
      res.status(200).json({ length: cart?.items.length, data: cart });
    }
  );

  applyCoupon = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const coupon = await copounsSchema.findOne({
        name: req.body.coupon,
        expireTime: { $gt: Date.now() },
      });
      if (!coupon) return next(new ApiErrors(`${req.__("not_found")}`, 404));
      const cart = await cartSchema.findOne({ user: req.user._id });
      if (!cart) return next(new ApiErrors("your cart is empty", 404));
      const totalPriceAfterDiscount: any = (
        cart.totalPrice -
        cart.totalPrice * (coupon.discount / 100)
      ).toFixed(2);
      cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
      cart.taxPrice = totalPriceAfterDiscount * 0.05;
      await cart.save();
      res.status(200).json({ length: cart.items.length, data: cart });
    }
  );

  calcTotalPrice(cart: ICarts) {
    let totalPrice: number = 0;
    cart.items.forEach((item: CartItems) => {
      totalPrice += item.price * item.quantity;
    });
    cart.totalPrice = totalPrice;
    cart.taxPrice = totalPrice * 0.05;
    cart.totalPriceAfterDiscount = undefined;
  }
}

const cartService = new CartService();
export default cartService;
