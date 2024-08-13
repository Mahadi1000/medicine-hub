import { z } from "zod";

export const fullnameValidation = z
  .string()
  .min(2, "fullname must be at least 2 characters")
  .max(20, "fullname must be no more than 20 characters")
  // .regex(/^[a-zA-Z0-9_]+$/, "fullname must not contain special characters");

export const signUpSchema = z.object({
  fullname: fullnameValidation,

  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
