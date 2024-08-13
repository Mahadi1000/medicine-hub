import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "@/model/user.model";
import VerificationEmail from "../../emails/VarificationEmail";
import { resend } from "@/lib/resend";

interface SendEmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
  verificationCode: string;
  fullname: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
  verificationCode,
  fullname,
}: SendEmailParams) => {
  try {
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verificationCode,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour expiry
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: verificationCode,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour expiry
      });
    }

    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Medicine Hub Verification Code",
      react: VerificationEmail({ fullname, otp: verificationCode }),
    });
    return { success: true, message: "Verification email sent successfully." };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
