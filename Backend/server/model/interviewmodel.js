import mongoose from "mongoose";

const { Schema, model } = mongoose;

const employeeSchema = new Schema({
  Time: String,
  Date: String,
  ResourseName: String,
  Technology: String,
  Experience: String,
  Description: String,
  Link: String,
  Status: String,
});

employeeSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

employeeSchema.set("autoIndex", true);

const Userdb = model("Employee", employeeSchema);
Userdb.createIndexes();

export default Userdb;
