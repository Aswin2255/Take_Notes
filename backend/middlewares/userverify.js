import jwt from "jsonwebtoken";
import usermodel from "../models/usermodel.js";

export const verifyuser = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, "secret", async (err, decodedtoken) => {
        if (err) {
          res.status(401).json({ status: false, message: "jwt token expired" });
        } else {
          req.user = decodedtoken.id;
          const userfind = await usermodel.findById(req.user)
          if(userfind.status){
            next();

          }
          else{
            res.status(409).json({ status: false, message: "user get blocked" });

          }
        
        }
      });
    } else {
      res.status(401).json({ status: false, message: "jwt token missing" });
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
