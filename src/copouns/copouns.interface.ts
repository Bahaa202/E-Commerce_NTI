import { Document } from "mongoose";

export interface ICopouns extends Document {
  readonly name: string;
  readonly discount: number;
  readonly expireTime: Date;
}
