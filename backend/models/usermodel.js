import mongoose from "mongoose";
const Userschema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique : true
        },
        phonenumber:{
            type:Number,
            required:true,
            unique : true
        },
        pass:{
            type:String,
            required:true
        },
        status:{
            type:Boolean,
            required:true,
            default:true
        }
        
    },
    { timestamps: true }
)
const usermodel = mongoose.model("User",Userschema)
export default usermodel;