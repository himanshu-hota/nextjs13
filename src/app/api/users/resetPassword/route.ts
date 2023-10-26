import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    connect();
    const reqBody = await request.json();
    const { email, password, confirmPassword, token } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found!!!", success: false },
        { status: 401 }
      );
    }

    if(!(user.forgotPasswordToken === token)){
         return NextResponse.json(
           { message: "Invalid credentials", success: false },
           { status: 401 }
         );
    }

    if (!(confirmPassword === password)) {
      return NextResponse.json(
        { message: "Password didn't match", success: false },
        { status: 401 }
      );
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    user.password = newPassword;

    await user.save();

    return NextResponse.json(
      { message: "Password reset successful!!!", success: true },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong!!!", success: false },
      { status: 500 }
    );
  }
};
