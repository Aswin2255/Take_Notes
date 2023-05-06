import express from "express";

//import { verifyclient } from "../middlewares/userverify.js";

import {
  Updatepost,
  createpost,
  deletepost,
  getpost,
} from "../controllers/postcontroller.js";
import { verifyuser } from "../middlewares/userverify.js";
const router = express.Router();

/* create */

router.post("/createpost", verifyuser, createpost);

/* read */

router.get("/getpost", verifyuser, getpost);

/* update */

router.patch(
  "/updatepost",

  verifyuser,
  Updatepost
);

/* delete */

router.delete("/deletepost/:id", verifyuser, deletepost);

export default router;
