var {reviewsdbs} = require('../model/review');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content cannot be empty"});
        return;
    }

    // new user
    const review = new reviewsdbs({
    name : req.body.name,
    website : req.body.website,
    first : req.body.first,
    second: req.body.second,
    third: req.body.third,
    comments: req.body.comments,
    notes: req.body.notes
    })

    // save user in the database
    review
        .save(review)
        .then(data => {
            //res.send(data)
            res.redirect('/reviews');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a new record"
            });
        });

}

// retrieve and return all users/ retrieve and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        reviewsdbs.findById(id)
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
        reviewsdbs.find()
            .then(review => {
                res.send(review)
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
    reviewsdbs.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update record with ${id}.`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Updating review information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    reviewsdbs.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}.`})
            }else{
                res.send({
                    message : "review was deleted successfully"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete record with id=" + id
            });
        });
}