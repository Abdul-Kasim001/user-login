import Userdb from "../model/interviewmodel.js";

export async function userEmployee(req, res, next) {
  try {
    const data = req.body;
    console.log("data", data);
    const details = {
      Time: data.Time,
      Date: data.Date,
      ResourseName: data.ResourseName,
      Technology: data.Technology,
      Experience: data.Experience,
      Description: data.Description,
      Link: data.Link,
      Status: data.Status,
    };
    const createUser = await Userdb.create(details);
    res.status(201).json({
      message: "create successfully",
      data: createUser,
    });
  } catch (err) {
    console.log(err);
    next();
  }
}

export async function getList(req, res, next) {
  try {
    const getemployeelist = await Userdb.find();
    res.status(200).json({
      message: "get successfully",
      data: getemployeelist,
    });
  } catch (err) {
    next();
  }
}

export async function updateEmployee(req, res, next) {
  try {
    const data = req.body;
    const id = data.id;

    const details = {
      Time: data.Time,
      Date: data.Date,
      ResourseName: data.ResourseName,
      Technology: data.Technology,
      Experience: data.Experience,
      Description: data.Description,
      Link: data.Link,
      Status: data.Status,
    };
    const updateList = await Userdb.findByIdAndUpdate(id, details);
    res.status(200).json({
      message: "create successfully",
      data: updateList,
    });
  } catch (err) {
    next();
  }
}

export async function deleteEmployee(req, res, next) {
  try {
    const data = req.params;
    const employeeId = data.id;
    const employeeDelete = await Userdb.findByIdAndDelete(employeeId);
    res.status(200).json({
      message: "Deleted Successfully",
      data: employeeDelete,
    });
  } catch (error) {
    next();
  }
}
