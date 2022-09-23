import mongoose from "mongoose";

const schema = new mongoose.Schema({
  Name: String,
  Emailid: String,
  Technology: String,
  Range: String,
  DateofJoining: String,
  DateofRelieving: String,
  Designation: String,
});
schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
schema.set("autoIndex", true);

const Userdb = mongoose.model("Dbs", schema);

export default Userdb;
