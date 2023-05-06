import express from "express"
import { blockunblock, getAlluser, getUsersession, login } from "../controllers/Admincontroller.js";

import { verifyadmin } from "../middlewares/adminverify.js";
const router = express.Router()


router.post('/login',login)
router.get('/alluser',verifyadmin,getAlluser)
router.get('/getusersession/:id',verifyadmin,getUsersession)
router.patch('/blockunblock',verifyadmin,blockunblock)

export default router;