import connect from "@/dbConfig/dbConfig";
import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModel";

export const POST = async (request:NextRequest) => {
    try {
        connect();
        const reqBody = await request.json();
        const {token} = reqBody;

        console.log(token);
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry:{$gt:Date.now()} });
        
        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:400});
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Email verified successfully",success:true }, { status: 201 });

    } catch (err:any) {
        return NextResponse.json({
            error:err.message
        },{status:500})
    }
}
