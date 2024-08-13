import mongoose, { Document, Model, Schema } from "mongoose";

// User roles
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  SUPER_ADMIN = "super admin",
}

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  photo?: string;
  emailVerified: boolean;
  verificationCode?: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyCodeExpiry?: Date;
}

// User schema definition

const UserSchema: Schema<IUser> = new mongoose.Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },
    role: {
      type: String,
      enum: UserRole,
      default: UserRole.USER,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyCodeExpiry: {
      type: Date,
      // required: [true, "Verify Code Expiry is required"],
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
