const mongoose = require('mongoose');
const {recorddbs, contactdbs} = require('../model/model');
const {db} = require('../database/connection');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content cannot be empty"});
        return;
    }

    // new user
    const record = new recorddbs({
        company: req.body.company,
        website : req.body.website,
        size: req.body.size,
        revenue : req.body.revenue,
        hq: req.body.hq,
        sales: req.body.sales,
        priority: req.body.priority
    })

    // save user in the database
    record
        .save(record)
        .then(data => {
            //res.send(data)
            res.redirect('/records');
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

        recorddbs.findById(id)
            .then(data =>{
                db.$lookup.recorddbs([
                    {
                        from: contactdbs,
                        localField: company,
                        foreignField: company,
                        as: contactdbs
                    }
                  ]);
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
        recorddbs.find()
            .then(record => {
                res.send(record)
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
    recorddbs.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update record with ${id}.`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Updating record information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    recorddbs.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}.`})
            }else{
                res.send({
                    message : "Record was deleted successfully"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete record with id=" + id
            });
        });
}