import { connectToMongoDB } from "@/config/mongoDbConfig/mongoConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    await connectToMongoDB();
    const reqBody = await request.json();
    const { pass, confirmPass, token } = reqBody;
    if (pass !== confirmPass) {
      return NextResponse.json(
        { message: "Password Not Matches" },
        { status: 400 },
      );
    }
    const user = await User.findOne({
      forgetPasswordToken: token,
      forgetPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 },
      );
    }
    const hashedPassword = await bcrypt.hash(pass, 10);
    user.password = hashedPassword;
    user.forgetPasswordToken = undefined;
    user.forgetPasswordTokenExpiry = undefined;
    await user.save();
    return NextResponse.json(
      { message: "Password changed successfully", success: true },
      { status: 200 },
    );
  } catch (error: any) {
    console.log("Error in changing password: ", error.message);
    return NextResponse.json(
      { message: "Error in changing password: " + error.message },
      { status: 500 },
    );
  }
}
