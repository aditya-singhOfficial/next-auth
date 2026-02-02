import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "@/config/mongoDbConfig/mongoConfig";
import User from "@/models/userModel"
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectToMongoDB();

export async function GET(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const userData = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            message:"User Found Successfully",
            success:true,
            data: userData
        },{status: 200});
    } catch (error:any) {
        return NextResponse.json({
            message:"User Not Found",
            success:false
        },{status:400});
    }
}