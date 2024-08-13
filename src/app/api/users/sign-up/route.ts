import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User, { IUser, UserRole } from "@/model/user.model";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const { fullname, email, password, photo } = await req.json();
    console.log(fullname, email, password, photo, req.body);
    // Validate password (implement rigorous validation here)
    // Check if user exists
    const existingUser = await User.findOne({ email, fullname });
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    // Save user to database
    const user: IUser = new User({
      fullname,
      email,
      password: hashedPassword,
      // photo,
      emailVerified: false,
      verificationCode: verifyCode,
      role: UserRole.USER,
      verifyCodeExpiry: expiryDate,
    });

    const savedUser: any = await user.save();
    console.log(savedUser);
    // Send verification email
    const emailResponse = await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
      verificationCode: verifyCode,
      fullname: savedUser.fullname,
    });
    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    console.log("[Sign up error]", error);
    NextResponse.json({ error: "Internal server error." });
  }
}
