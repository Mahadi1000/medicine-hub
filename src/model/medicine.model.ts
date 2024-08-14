import mongoose, { Schema, Document, Types } from "mongoose";
import { UserRole } from "./user.model";


export interface IMedicine extends Document {
  userId: Types.ObjectId;
  title: string;
  description?: string;
  imageUrl?: string[];
  price: number;
  discount: number;
  stockStatus: "In Stock" | "Out of Stock";
  status: "Active" | "Inactive";
  category?: Types.ObjectId;
  attachments?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const medicineSchema = new Schema<IMedicine>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      role: UserRole,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    imageUrl: [{ type: String }],
    price: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    stockStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      default: "In Stock",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    attachments: { type: String },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


export const medicineModel =
  (mongoose.models.Medicine as mongoose.Model<IMedicine>) ||
  mongoose.model<IMedicine>("Medicine", medicineSchema);
