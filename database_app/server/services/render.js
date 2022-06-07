const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/records')
        .then(function(response){
            res.render('index', { records : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
    
}

exports.add_record = (req, res) =>{
    res.render('add_record');
}

exports.add_contact = (req, res) =>{
    res.render('add_contact');
}

exports.contacts_list = (req, res) => {
    res.render('contacts_list');
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