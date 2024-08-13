import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/model/user.model";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const { email, password } = await req.json();
    console.log(email, password);
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials." });
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return NextResponse.json({
        error: "Email not verified. Please verify your email.",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials." });
    }

    // Generate JWT tokens
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

   return NextResponse.json({
      message: "Login successful!",
      success: true,
      accessToken,
      refreshToken,
    });
    console.log("Login successful")
  } catch (error) {
    console.log("[Sign up error]", error);
    NextResponse.json({ error: "Internal server error." });
  }
}
