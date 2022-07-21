var {emailsdbs} = require('../model/email');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content cannot be empty"});
        return;
    }

    // new user
    const email = new emailsdbs({
    email : req.body.email,
    name : req.body.name,
    company : req.body.company,
    designation : req.body.designation,
    country: req.body.country,
    source: req.body.source,
    status: req.body.status,
    ab: req.body.ab,
    ao: req.body.ao
    })

    // save user in the database
    email
        .save(email)
        .then(data => {
            //res.send(data)
            res.redirect('/emails');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a new email"
            });
        });

}

// retrieve and return all users/ retrieve and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        emailsdbs.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Record not found with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving record with id " + id})
            })

    }else{
        emailsdbs.find()
            .then(email => {
                res.send(email)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retrieving information" })
            })
    }

    
}


// Update a new identified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    emailsdbs.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update record with ${id}.`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Updating email information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    emailsdbs.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}.`})
            }else{
                res.send({
                    message : "email was deleted successfully"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete record with id=" + id
            });
        });
}