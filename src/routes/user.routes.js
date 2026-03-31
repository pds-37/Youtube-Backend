import {Router} from "express";
import { registerUser } from "../controllers/user.controllers.js";

const router = Router()

router.route("/register").post(registerUser)
// router.route("/login").post(login) // but login still not defined in controller


export default router