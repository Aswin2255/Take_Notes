import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import usermodel from "../models/usermodel.js";
import sessionmodel from "../models/sessionmodel.js";
const maxage = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: maxage,
  });
};
export const register = async (req, res) => {
  try {
    let { username, email, phonenumber, pass, cpass } = req.body.data.values;
    phonenumber = parseInt(phonenumber);
    const salt = await bcrypt.genSalt();
    const passhash = await bcrypt.hash(pass, salt);
    const newuser = new usermodel({
      username,
      email,
      phonenumber,
      pass: passhash,
    });
    const saveduser = await newuser.save();
    const token = createToken(saveduser._id);
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: true,
      maxage: maxage * 1000,
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    });
    const startdate = new sessionmodel({
      userid: saveduser._id,
      starttime: new Date(),
    });
    const savedsession = await startdate.save();

    res.status(201).json({
      status: true,
      message: "user created succesfully",
      userfind: [saveduser],
      savedsession,
    });
  } catch (error) {
    console.log(error);
    let err;
    if (error.code === 11000) {
      err = { status: false, message: "user already existed" };
    } else {
      err = { status: false, message: error.message };
    }
    res.status(406).json(err);
  }
};
export const login = async (req, res) => {
  try {
    const { email, pass } = req.body.data.values;
    const userfind = await usermodel.find({ email: email });
    if (!userfind.length) {
      res
        .status(404)
        .json({ status: false, message: "username or password is wrong" });
    } else {
      const ismatch = await bcrypt.compare(pass, userfind[0].pass);
      if (ismatch) {
        if (userfind[0].status) {
          userfind[0].pass = undefined;
          const token = createToken(userfind[0]._id);
          res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: true,
            maxage: maxage * 1000,
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          });
          const startdate = new sessionmodel({
            userid: userfind[0]._id,
            starttime: new Date(),
          });
          const savedsession = await startdate.save();
          res.status(200).json({ status: true, userfind, savedsession });
        } else {
          res
            .status(409)
            .json({ status: false, message: "user is blocked by admin" });
        }
      } else {
        res
          .status(404)
          .json({ status: false, message: "username or password is wrong" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    const stoptime = await sessionmodel.findByIdAndUpdate(req.body.sessionid, {
      $set: {
        endtime: new Date(),
      },
    });
    res.status(200).json({ status: true, msg: "user get logout" });
  } catch (error) {
    res.status(400).json({ status: false, msg: "error happend" });
  }
};
export const getUsersession = async (req, res) => {
  try {
    console.log("recahed");
    const allsession = await sessionmodel.find({ userid: req.user });

    res
      .status(200)
      .json({ status: true, allsession, msg: "user session fetched" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, msg: "unexpected error ocured" });
  }
};
