import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  connect();
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User doesn't exist" },
        { status: 400 }
      );
    }

    // check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.email,
      email: user.email,
    };

    const secretKey = process.env.JWT_SECRET_KEY!;
    const token = await jwt.sign(tokenData, secretKey, {
      expiresIn: "1d",
    });

    // create response
    const response = NextResponse.json({message:"Login successful",success:true},{status:200});
    // set cookies
    response.cookies.set("token",token,{
      httpOnly:true,
    });
    

    return response;

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
