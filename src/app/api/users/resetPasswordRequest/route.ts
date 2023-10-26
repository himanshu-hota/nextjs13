import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

export const POST = async (request: NextRequest) => {
  try {
    connect();

    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "No user found with this email", success: false },
        { status: 401 }
      );
    }

    await sendEmail({ email, emailType: "RESET", userId: user._id.toString() });

    return NextResponse.json({message:"Reset link sent to your email",success:true},{status:201});
    
  } catch (err: any) {
    return NextResponse.json({ error: err.message,success:false }, { status: 500 });
  }
};
