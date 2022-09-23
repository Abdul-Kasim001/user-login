import { Router } from "express";
const router = Router();

import { userEmployee } from "../controller/interviewcontroller.js";
import { getList } from "../controller/interviewcontroller.js";
import { updateEmployee } from "../controller/interviewcontroller.js";
import { deleteEmployee } from "../controller/interviewcontroller.js";

router.route("/create").post(userEmployee);
router.route("/").get(getList);
router.route("/update").put(updateEmployee);
router.route("/delete/:id").delete(deleteEmployee);

export default router;
