import {connectToMongoDB} from "@/config/mongoDbConfig/mongoConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectToMongoDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        if(!username || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return NextResponse.json({message: "Email is not valid"},{status: 400});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json({message: "User already exists"},{status:400});
        }

        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,genSalt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User Created Successfully",
            success: true, 
            savedUser
        },{status:201})
    } catch (error: any) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });  
    }
}