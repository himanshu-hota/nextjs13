import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const response = await NextResponse.json({message:"Logout sucessful!!!",success:true});
        response.cookies.set('token',"",{httpOnly:true,expires:new Date(0)});
        return response;
   } catch (err:any) {
        return NextResponse.json({message:err.message},{status:400})
    }
}