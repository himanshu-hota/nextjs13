import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value || '';
    const decodedToken:any = jwt.verify(token,process.env.JWT_SECRET_KEY!);
    return decodedToken?.id;

  } catch (error:any) {
    console.log(error.message);
  }
};
