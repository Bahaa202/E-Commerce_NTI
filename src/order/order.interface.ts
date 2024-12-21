import { CartItems } from "cart/cart.interface";
import { Document } from "mongoose";
import { IUsers, Address } from "users/users.interface";
export interface IOrder extends Document {
  orderId: string;
  items: CartItems;
  customerId: IUsers;
  address: Address;
  itemsPrice: number;
  totalPrice: number;
  taxPrice: Number;
  paymentMethod: "cash" | "credit card";
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
