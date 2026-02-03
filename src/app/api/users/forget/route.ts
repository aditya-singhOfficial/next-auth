import { connectToMongoDB } from "@/config/mongoDbConfig/mongoConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { sendMail } from "@/helpers/mailer";


export async function POST(request: NextRequest) {
  try {
    await connectToMongoDB();
    const reqBody = request.json();
    const { email } = await reqBody;
    console.log("Received forget password request for email:", email);
    const user = await User.findOne({email});
    if (!user) {
      console.log("User not found with email:", email);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await sendMail({ email, mailType: "RESET", userID: user._id });
    return NextResponse.json(
      { 
        message: "Forget password Mail generated", success: true },
      { status: 200 },
    );
  } catch (error: any) {
    console.log("Error in forget password route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
