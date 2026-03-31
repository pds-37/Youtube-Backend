import {Router} from "express";
import { registerUser } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(
    upload.fields([
     {
        name: "avatar",
        maxCount: 1
     },
     {
        name: "coverimage",
        maxCount:1
     }
    ]),
    
    registerUser)
// router.route("/login").post(login) // but login still not defined in controller


export default router