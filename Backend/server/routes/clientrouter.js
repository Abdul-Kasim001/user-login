import { Router } from "express";
const router = Router();

import { create } from "../controller/Clientcontroller.js";
import { find } from "../controller/Clientcontroller.js";
import { update } from "../controller/Clientcontroller.js";
import { clientDelete } from "../controller/Clientcontroller.js";

router.route("/api/create").post(create);
router.route("/api/get").get(find);
router.route("/api/users/:id").put(update);
router.route("/delete/users/:id").delete(clientDelete);

export default router;
