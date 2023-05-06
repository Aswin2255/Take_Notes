import mongoose, { Mongoose } from "mongoose";
const sessionschema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    starttime:{
        type : Date
    },
    endtime:{
        type : Date
    },
    activetime:{
        type : Date
    }
})
const sessionmodel = mongoose.model("Session",sessionschema)
export default sessionmodel
