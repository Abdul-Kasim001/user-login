import SignUpDb from "../model/SignupModel.js";

export async function userSignup(req, res, next) {
  try {
    const data = req.body;
    const existUser = await SignUpDb.findOne({ email: data.email });
    const details = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };
    if (existUser) {
      res.status(409).json({
        message: "user already exist",
        data: existUser,
      });
    } else {
      const createUser = await SignUpDb.create(details);

      res.status(201).json({
        message: "User Created Successfully",
        data: createUser,
      });
    }
  } catch (err) {
    console.log(err);
    next();
  }
}

export async function userLogin(req, res, next) {
  try {
    const data = req.body;
    console.log("data", data);

    const existUser = await SignUpDb.findOne({ email: data.email });
    console.log("existUser", existUser);

    if (existUser) {
      const checkPasword = existUser.password === data.password;
      console.log("checkPassword", checkPasword);

      if (checkPasword) {
        res.status(200).json({
          message: "user login successfully",
          data: existUser,
        });
      } else {
        res.status(400).json({
          message: "password not matched",
        });
      }
    } else {
      res.status(400).json({
        message: "user not found",
      });
    }
  } catch (err) {
    console.log(err);
    next();
  }
}
