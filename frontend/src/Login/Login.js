import "./login.css";
// import bgimage from "./bgimage.jpg";
import medium from "./medium.jpg";
// import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import { Link } from "react-router-dom";
import SignUp from "../Signup/SignUp";
import { History } from "history";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => console.log(data);

  React.useEffect(() => {
    console.log("running first");
  }, []);
  return (
    <div className="form-container">
      <img
        // src={medium}
        // alt="Group of collegues having a meeting"
        // srcset=""
        aria-label="Group of collegues having a meeting"
        className="login-image"
      />

      <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
        {/* onSubmit={handleSubmit(onSubmit)} */}
        {/* <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"> */}
        <h1 className="login-header">Login</h1>
        <>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            autoFocus
            fullWidth
            style={{ display: "block" }}
            name="userName"
            {...register("userName", { required: true })}
          />
          <FormHelperText className="helper" style={{ color: "red" }}>
            {errors.userName && "Username is required"}
          </FormHelperText>
        </>
        <TextField
          id="outlined-basic"
          label="Password "
          type="password"
          variant="outlined"
          autoFocus
          fullWidth
          style={{ display: "block" }}
          name="password"
          {...register("password", { required: true })}
        />
        <FormHelperText className="helper" style={{ color: "red" }}>
          {errors.password && "Password is required"}
        </FormHelperText>
        <Button
          type="submit"
          className="btn"
          variant="contained"
          fullwidth="true"
        >
          Log In
        </Button>
        <p>Dont have an account</p>
        <Link to="SignUp">Sign up</Link>
      </form>
    </div>
  );
};

export default Login;
