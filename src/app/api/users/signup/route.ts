import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";



export const POST = async (request:NextRequest) => {
    connect();
    try {
        
        // extract data from the request
        const reqBody = await request.json();

        const {username,email,password} = reqBody;

        // check if user exists
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json(
               { error: "User already exists!!!" },
               { status: 400 }
             );
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({username,email,password:hashedPassword});
        const savedUser = await newUser.save();
        console.log('User saved in Database/User created');

        return NextResponse.json({message:"User created successfully!!",success:true,user:savedUser});


    } catch (err:any) {
        return NextResponse.json({error:err.message},{status:500})
    }
}

