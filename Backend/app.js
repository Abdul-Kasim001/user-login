import express, { json } from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(
  json({
    limit: "25MB",
  })
);

import interview from "./server/routes/interviewrouter.js";

import client from "./server/routes/clientrouter.js";

import employee from "./server/routes/employeerouter.js";

import signup from "./server/routes/SignupRouter.js";

// import User from "./server/routes/LoginRouter.js";

app.use("/interview", interview);

app.use("/client", client);

app.use("/employee", employee);

app.use("/signup", signup);

// app.use("/users", User);

export default app;
