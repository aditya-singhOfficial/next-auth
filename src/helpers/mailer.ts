import nodemailer from "nodemailer";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
export const sendMail = async ({ email, mailType, userID }: any) => {
  try {
    const hashedToken = await jwt.sign(
      { id: userID.toString() },
      process.env.TOKEN_SECRET!,
      { expiresIn: "1d" },
    );
    if (mailType === "VERIFY") {
      await User.findOneAndUpdate(
        { _id: userID },
        { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 },
      );
    } else if (mailType === "RESET") {
      await User.findOneAndUpdate(
        { _id: userID },
        {
          forgetPasswordToken: hashedToken,
          forgetPasswordTokenExpiry: Date.now() + 3600000,
        },
      );
    }

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADD,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAILTRAP_FROM,
      to: email,
      subject:
        mailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${mailType === "VERIFY" ? "verifyemail" : "changePassword"}?token=${hashedToken}">here</a> to ${mailType === "VERIFY" ? "verify your email" : "reset your password"}. This link will expire in 1 hour.</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    console.log("Mail sent successfully: ", mailResponse);
    return mailResponse;
  } catch (error: any) {
    console.error("Error sending mail: ", error);
    throw new Error(error.message);
  }
};
