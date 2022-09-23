import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: false,
  },
  companyaddress: {
    type: String,
    required: false,
  },
  PanNumber: {
    type: String,
    required: false,
  },
  GSTNo: {
    type: String,
    required: false,
  },
  contactPersonnumber: {
    type: Number,
    required: false,
  },
  contactpersonname: {
    type: String,
    required: false,
  },
  purpose: {
    type: String,
    required: false,
  },
  projectstatus: {
    type: String,
    required: false,
  },

  description: {
    type: String,
    required: false,
  },
});

userSchema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

userSchema.set("autoIndex", true);

const Userdb = mongoose.model("clientdb", userSchema);

export default Userdb;
