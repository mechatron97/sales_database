var Contactsdb = require('../model/contact_model');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content cannot be empty"});
        return;
    }

    // new user
    const contact = new Contactsdb({
        person : req.body.person
    })

    // save user in the database
    contact
        .save(contact)
        .then(data => {
            //res.send(data)
            res.redirect('/');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrieve and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Contactsdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "contact not found with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving contact with id " + id})
            })

    }else{
        Contactsdb.find()
            .then(contact => {
                res.send(contact)
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
    contactdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update contact with ${id}.`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Updating contact information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    contactdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}.`})
            }else{
                res.send({
                    message : "contact was deleted successfully"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete contact with id=" + id
            });
        });
}