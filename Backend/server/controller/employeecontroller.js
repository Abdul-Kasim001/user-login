import Userdb from "../model/employeemodel.js";
export async function create(req, res) {
  // new users
  const user = new Userdb({
    Name: req.body.Name,
    // id :req.body.id,
    Emailid: req.body.Emailid,
    Technology: req.body.Technology,
    Range: req.body.Range,
    DateofJoining: req.body.DateofJoining,
    DateofRelieving: req.body.DateofRelieving,
    Designation: req.body.Designation,
  });
  // save user in the database
  user.save();
  res.status(200).json("create successfully");
}

// retrieve and return all users/ retrive and return a single user
export async function find(req, res) {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Erro retrieving user with id " + id });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occurred while retriving user information",
        });
      });
  }
}

// Update a new idetified user by user id
export async function update(req, res) {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe user not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
}

// Delete a user with specified user id in the request
export async function empdelete(req, res) {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
}
