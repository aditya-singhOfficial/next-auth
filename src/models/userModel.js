import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Please Provide a username"]
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Please Provide a username"]
    },
    password: {
        type: String,
        unique: true,
        required: [true, "Please Provide a username"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;