var {locationsdbs} = require('../model/model3');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content cannot be empty"});
        return;
    }

    // new user
    const location = new locationsdbs({
        company: req.body.company,
        india : req.body.india,
        canada : req.body.canada,
        uk : req.body.uk,
        usa : req.body.usa
    })

    // save user in the database
    location
        .save(location)
        .then(data => {
            //res.send(data)
            res.redirect('/locations');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a new location"
            });
        });

}

// retrieve and return all users/ retrieve and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        locationsdbs.findById(id)
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
        locationsdbs.find()
            .then(location => {
                res.send(location)
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
    locationsdbs.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update record with ${id}.`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Updating location information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    locationsdbs.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}.`})
            }else{
                res.send({
                    message : "location was deleted successfully"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete record with id=" + id
            });
        });
}