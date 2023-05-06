import mongoose from "mongoose";
const adminschema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    }
})
const adminmodel = mongoose.model('Admin',adminschema)
export default adminmodel;
