import {connectToMongoDB} from "@/config/mongoDbConfig/mongoConfig"
import User from "@/models/userModel"
import { NextResponse, NextRequest } from "next/server"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectToMongoDB();
export async function POST(request: NextRequest) {
    try {
        const reqBody = request.json();
        const {email, password} = await reqBody;
        if(!email || !password) {
            return NextResponse.json({message: "All fields are required"}, {status:400});
        }

        const existingUser = await User.findOne({email});
        if(!existingUser){
            return NextResponse.json({message: "Invalid credentials"}, {status:400});
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid){
            return NextResponse.json({message: "Invalid credentials"}, {status:400});
        }
        console.log("User logged in successfully:", existingUser);

        const tokenData = {
            id: existingUser._id,
            email: existingUser.email,
            username: existingUser.username
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});
        
        const response =  NextResponse.json({message: "Login successful", success: true, user: existingUser});

        response.cookies.set("token", token, {
            httpOnly: true,});
        return response;

    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"}, {status:500});
    }
}