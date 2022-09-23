import mongoose from "mongoose";

const { Schema, model } = mongoose;

const signupSchema = new Schema({
  name: String,
  email: String,
  phone: Number,
  password: String,
});

signupSchema.set("autoIndex", true);

const SignUpDb = model("signup", signupSchema);
SignUpDb.createIndexes();

export default SignUpDb;
