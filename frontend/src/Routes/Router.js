import React from "react";
import Client from "../Client/Client";
import Employee from "../Employee/Employee";
import Interview from "../Interview/Interview";
import Login from "../Login/Login";
import Signup from "../Signup/SignUp";

const Router = [
  {
    path: "/interview",
    name: "interview ",
    element: Interview,
  },
  {
    path: "/client",
    name: "Client",
    element: Client,
  },
  {
    path: "/employee",
    name: "employee",
    element: Employee,
  },
];

export default Router;
