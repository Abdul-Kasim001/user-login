import { Router } from "express";
const router = Router();

import { userLogin, userSignup }from "../Controller/signUpController.js";

router.route("/create").post(userSignup);

router.route("/login").post(userLogin);

export default router;

