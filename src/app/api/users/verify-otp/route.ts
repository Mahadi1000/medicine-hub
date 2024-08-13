import dbConnect from "@/lib/db";
import User from "@/model/user.model";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  await dbConnect();

  try {
    const { fullname, code } = await request.json();
    const decodedFullname = decodeURIComponent(fullname);

    // Find the user by fullname
    const user = await User.findOne({ fullname: decodedFullname });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Validate the code and its expiry
    const isCodeValid = user.verificationCode === code;
    const isCodeNotExpired =
      user.verifyCodeExpiry && new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      // Update the user's verification status and remove the code
      user.emailVerified = true;
      user.verificationCode = undefined;
      user.verifyCodeExpiry = undefined;
      const updatedUser = await user.save();

      return NextResponse.json({
        success: true,
        message: "Account verified successfully",
        user: updatedUser,
      });
    } else if (!isCodeNotExpired) {
      // Code has expired
      return NextResponse.json(
        {
          success: false,
          message: "Verification code has expired. Please request a new one.",
        },
        { status: 400 }
      );
    } else {
      // Code is incorrect
      return NextResponse.json(
        { success: false, message: "Incorrect verification code" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("Error verifying user:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
