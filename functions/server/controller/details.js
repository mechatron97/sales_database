/* eslint-disable new-cap */
/* eslint-disable max-len */
const {detailsdbs} = require("../model/details");

// create and save new user
exports.create = (req, res)=>{
  // new user
  const details = new detailsdbs({
    company: req.body.company,
    india: req.body.india,
    canada: req.body.canada,
    uk: req.body.uk,
    usa: req.body.usa,
    person: req.body.person,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    linkedin: req.body.linkedin,
    comments: req.body.comments,
  });

  // save user in the database
  details
      .save(details)
      .then((data) => {
        // res.send(data)
        res.redirect("/app/details");
      })
      .catch((err) =>{
        res.status(500).send({
          message: err.message,
        });
      });
};

// retrieve and return all users/ retrieve and return a single user
exports.find = (req, res)=>{
  if (req.query.id) {
    const id = req.query.id;

    detailsdbs.findById(id)
        .then((data) =>{
          if (!data) {
            res.status(404).send({message: "Record not found with id "+ id});
          } else {
            res.send(data);
          }
        })
        .catch((err) =>{
          res.status(500).send({message: "Error retrieving record with id " + id});
        });
  } else {
    detailsdbs.find()
        .then((details) => {
          res.send(details);
        })
        .catch((err) => {
          res.status(500).send({message: err.message || "Error Occurred while retrieving information"});
        });
  }
};


// Update a new identified user by user id
exports.update = (req, res)=>{
  const id = req.params.id;

  detailsdbs.findByIdAndUpdate(id, req.body)
      .then((data) => {
        res.send(data);
      })
      .catch((err) =>{
        res.status(500).send({message: "Error Updating information"});
      });
};

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
  const id = req.params.id;

  detailsdbs.findByIdAndDelete(id)
      .then(() => {
        res.status(200).json({
          message: "Deleted",
        });
      });
};
