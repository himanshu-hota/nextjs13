import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

//

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    let mailOption = {
      from: process.env.MAILTRAP_FROM_EMAIL,
      to: email,
      subject: "",
      html: "",
    };

    console.log(emailType);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });

      mailOption = {
        from: "HimanshuHota55@gmail.com",
        to: email,
        subject: "Verify your email",
        html: `<p>Click <a href="${process.env.domain}/verifyEmail?token=${hashedToken}">here</a> to Verify your email
        </p>`,
      };
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpirt: Date.now() + 3600000,
      });

      mailOption = {
        from: "HimanshuHota55@gmail.com",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${process.env.domain}/resetPassword?token=${hashedToken}">here</a> to reset your password
        </p>`,
      };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailResponse = await transporter.sendMail(mailOption);

    return mailResponse;
  } catch (err: any) {
    console.log(err);
  }
};
