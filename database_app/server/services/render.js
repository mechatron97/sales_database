const axios = require('axios');
const { response } = require('express');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/records')
        .then(function(response){
            res.render('index', { records : response.data });
        })
        .catch(err => {
            res.send(err);
        })
}

exports.add_record = (req, res) =>{
    res.render('add_record');
}

exports.add_contact = (req, res) =>{
    res.render('add_contact');
}

exports.add_location = (req, res) =>{
    res.render('add_location');
}

exports.contacts = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/contacts')
        .then(function(response){
            res.render('contacts', { contacts : response.data });
        })
        .catch(err => {
            res.send(err);
        })
}

exports.locations = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/locations')
        .then(function(response){
            res.render('locations', { locations : response.data });
        })
        .catch(err => {
            res.send(err);
        })
}

exports.update_record = (req, res) =>{
    axios.get('http://localhost:3000/api/records', { params : { id : req.query.id }})
        .then(function(recorddata){
            res.render("update_record", { record : recorddata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.update_contact = (req, res) =>{
    axios.get('http://localhost:3000/api/contacts', { params : { id : req.query.id }})
        .then(function(contactdata){
            res.render("update_contact", { contact : contactdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.update_location = (req, res) =>{
    axios.get('http://localhost:3000/api/locations', { params : { id : req.query.id }})
        .then(function(locationdata){
            res.render("update_location", { location : locationdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}