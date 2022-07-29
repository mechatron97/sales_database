const {contactdbs} = require('../model/model2');

const connectDB = require('../database/connection');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

// const agg = [
//   {
//     '$lookup': {
//       'from': 'recorddbs', 
//       'localField': 'company', 
//       'foreignField': 'company', 
//       'as': 'contacts'
//     }
//   }
// ];

// MongoClient.connect(
//   'mongodb+srv://digy4:1234@cluster0.ipci8.mongodb.net/records?retryWrites=true&w=majority',
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   function(connectErr, client) {
//     assert.equal(null, connectErr);
//     const coll = client.db('records').collection('contactdbs');
//     coll.aggregate(agg, (cmdErr, result) => {
//       assert.equal(null, cmdErr);
//     });
//     client.close();
//   });



// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content cannot be empty"});
        return;
    }


    // new user
    const contact = new contactdbs({
        company: req.body.company,
        person : req.body.person,
        designation : req.body.designation,
        email : req.body.email,
        phone : req.body.phone,
        linkedin : req.body.linkedin,
        comments : req.body.comments
    })


    // save user in the database
    contact
        .save(contact)
        .then(data => {
            //res.send(data)
            res.redirect('/contacts');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a new contact"
            });
        });

}

// retrieve and return all users/ retrieve and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        contactdbs.findById(id)
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
        contactdbs.find()
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
    contactdbs.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update record with ${id}.`})
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

    contactdbs.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}.`})
            }else{
                res.send({
                    message : "Contact was deleted successfully"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete record with id=" + id
            });
        });
}