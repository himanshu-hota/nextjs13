import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

// 

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpirt: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ca6d56448f3343",
        pass: "dc65977c26319b",
      },
    });

    const mailOption = {
      from: "HimanshuHota55@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.domain
      }/verifyEmail?token=${hashedToken}">here</a> to ${
        "VERIFY" ? "Verify your email" : "Reset your password"
      }</p>`,
    };

    const mailResponse = await transporter.sendMail(mailOption);

    return mailResponse;

  } catch (err: any) {
    console.log(err);
  }
};
