import { error } from "console";
import mongoose from "mongoose";

export const connectToMongoDB = async() =>{
    try {
        if(mongoose.connections[0].readyState){
            console.log("Already Connected to Database");
            return; 
        }
        await mongoose.connect(process.env.MOGODB_URI!);
        const connection = mongoose.connection;

        connection.on("connected",()=>{
            console.log("Database Connected Successfully");
        })

        connection.on("error",(error)=>{
            console.log("Something Went Wrong!",error);
            process.exit();
        })
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}