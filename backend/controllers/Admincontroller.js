import adminmodel from "../models/adminmodel.js";
import jwt from "jsonwebtoken";
import usermodel from "../models/usermodel.js";
import sessionmodel from "../models/sessionmodel.js";

const maxage = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: maxage,
  });
};
export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, pass } = req.body.data.values;
    const userfind = await adminmodel.find({ email: email });
    console.log(userfind);
    if (!userfind.length) {
      res
        .status(404)
        .json({ status: false, message: "username or password is wrong" });
    } else {
      const ismatch = userfind[0].pass === pass;
      if (ismatch) {
        userfind[0].pass = undefined;
        const token = createToken(userfind[0]._id);
        res.cookie("adminjwt", token, {
          withCredentials: true,
          httpOnly: true,
          maxage: maxage * 1000,
          expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        });

        res.status(200).json({ status: true, userfind });
      } else {
        res
          .status(404)
          .json({ status: false, message: "username or password is wrong" });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ status: false, message: "unexpected error occured" });
  }
};
export const getAlluser = async (req, res) => {
  try {
    const alluser = await usermodel.find();
    res.status(200).json({ status: true, alluser });
  } catch (error) {
    res.status(400).json({ status: false, msg: "unexpected error ocured" });
  }
};
export const getUsersession = async (req, res) => {
  try {
    const { id } = req.params;
    const allsession = await sessionmodel.find({ userid: id });

    res
      .status(200)
      .json({ status: true, allsession, msg: "user session fetched" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, msg: "unexpected error ocured" });
  }
};
export const blockunblock = async (req,res)=>{
  try {
    const {userid,status} = req.body.data
    
    const updateduser = await usermodel.findByIdAndUpdate(userid,{$set:{status:!status}},{new:true})
     const updateuser = await usermodel.find() 
 
    res.status(200).json({status:true,msg:'user status value changed',updateuser})
    
  } catch (error) {
    console.log(error)
    res.status(200).json({status:false,msg:'error happend'})
    
  }
}
