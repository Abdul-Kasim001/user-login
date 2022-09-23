import "./signup.css";
import React from "react";
import Signupimg from "./signuplarge.jpg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { FormHelperText } from "@mui/material";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = data => console.log(data);
  return (
    <div className="signup-container">
      <img
        // src={Signupimg}
        // alt=""
        // srcset=""
        aria-label="Group of collegues having a meeting"
        className="signup-image"
      />

      <div className="wrapper-check">
        <form
          action=""
          className="form-signup"
          onSubmit={handleSubmit(onSubmit)}>
          <h1 className="signup-header">Sign Up</h1>
          <TextField
            id="outlined-basic"
            label="Fullname"
            variant="outlined"
            fullWidth
            // style={{ display: "block" }}
            name="fullName"
            {...register("fullName", { required: true })}
          />
          <FormHelperText className="helper" style={{ color: "red" }}>
            {errors.fullName && "Full name is required"}
          </FormHelperText>
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            fullWidth
            style={{ display: "block" }}
            name="address"
            {...register("address", { required: true })}
          />
          <FormHelperText className="helper" style={{ color: "red" }}>
            {errors.address && "Address is required"}
          </FormHelperText>
          <TextField
            className="textfield"
            id="outlined-basic"
            label="Employee ID"
            variant="outlined"
            fullWidth
            style={{ display: "block" }}
            name="employeeID"
            {...register("employeeID", { required: true })}
          />
          <FormHelperText className="helper" style={{ color: "red" }}>
            {errors.employeeID && "Employee ID is required"}
          </FormHelperText>
          <TextField
            id="outlined-basic"
            label="Designation"
            variant="outlined"
            fullWidth
            style={{ display: "block" }}
            name="designation"
            {...register("designation", { required: true })}
          />
          <FormHelperText className="helper" style={{ color: "red" }}>
            {errors.designation && "Designation is required"}
          </FormHelperText>
          <TextField
            id="outlined-basic"
            label="Email ID"
            variant="outlined"
            fullWidth
            style={{ display: "block" }}
            name="emailID"
            {...register("emailID", { required: true })}
          />
          <FormHelperText className="helper" style={{ color: "red" }}>
            {errors.emailID && "Email ID is required"}
          </FormHelperText>
          <TextField
            id="outlined-basic"
            label="Password "
            variant="outlined"
            type="password"
            fullWidth
            style={{ display: "block" }}
            name="password"
            {...register("password", { required: true })}
          />
          <FormHelperText className="helper" style={{ color: "red" }}>
            {errors.password && "Password is required"}
          </FormHelperText>
          <Button type="submit" className="btn" variant="contained" fullwidth>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
