import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";

export const GET = async (request:NextRequest) => {
    
    try {
        const userId = await getDataFromToken(request);
        // fetch a user but dont fetch password.
        const user = await User.findById({ _id: userId }).select("-password");
        return NextResponse.json({message:"User found",data:user},{status:200});

    } catch (err:any) {
        console.log(err);
        return NextResponse.json({error:err.message},{status:400})
    }

}
