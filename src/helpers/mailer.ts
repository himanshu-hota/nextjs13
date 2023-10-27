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
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to Verify your email
        </p> <br/> <p> Or copy this link and paste it in browser ${process.env.domain}/resetPassword?token=${hashedToken} 
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
        html: `<p>Click <a href="${process.env.DOMAIN}/resetPassword?token=${hashedToken}">here</a> to reset your password
        </p> <br/> <p> Or copy this link and paste it in browser ${process.env.domain}/resetPassword?token=${hashedToken} 
        </p> `,
      };
    }

    // const transporter = nodemailer.createTransport({
    //   host: process.env.MAILTRAP_HOST,
    //   port: process.env.MAILTRAP_PORT,
    //   auth: {
    //     user: process.env.MAILTRAP_USER,
    //     pass: process.env.MAILTRAP_PASS,
    //   },
    // });

    const user = process.env.MAILTRAP_USER || "";
    const pass = process.env.MAILTRAP_PASS || "";

      const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: user,
          pass: pass,
        },
      });

    const mailResponse = await transporter.sendMail(mailOption);

    return mailResponse;
  } catch (err: any) {
    console.log(err);
  }
};