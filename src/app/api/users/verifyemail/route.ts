import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connectToMongoDB } from "@/config/mongoDbConfig/mongoConfig";
import { sendMail } from "@/helpers/mailer";
connectToMongoDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (user.isVerified == true)
      return NextResponse.json(
        {
          message: "User Already Verified",
          success: true,
        },
        { status: 200 },
      );
    if (!user) {
      return NextResponse.json(
        {
          message: "Link Expired",
          success: false,
        },
        { status: 400 },
      );
    }
    user.isVerified = true;
    await user.save();

    return NextResponse.json(
      {
        message: "Email Verified Successfully",
        success: true,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(`error verification: `, error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
