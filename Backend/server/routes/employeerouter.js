// // const express = require('express');
// import express from "express";

// const route = express.Router();

// // import {route} from 'Router';

// // const controller = require('../controller/usercontroller');

// import {
//   create,
//   find,
//   update,
//   empdelete,
// } from "../controller/employeecontroller.js";

// // API
// route.post("/api/create", create);
// route.get("/api/get", find);
// route.put("/api/users/:id", update);
// route.delete("/delete/users/:id", empdelete);

// export default route;

import { Router } from "express";
const router = Router();

import { create } from "../controller/employeecontroller.js";
import { find } from "../controller/employeecontroller.js";
import { update } from "../controller/employeecontroller.js";
import { empdelete } from "../controller/employeecontroller.js";

router.route("/api/create").post(create);
router.route("/api/get").get(find);
router.route("/api/users/:id").put(update);
router.route("/delete/users/:id").delete(empdelete);

export default router;
