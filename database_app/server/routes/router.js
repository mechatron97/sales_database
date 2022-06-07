const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');
const control = require('../controller/contacts_controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-record', services.add_record)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-record', services.update_record)

route.get('/contacts-list', services.contacts_list)

route.get('/add-contact', services.add_contact)

// API
route.get('/api/contacts-list', control.find);
route.post('/api/records', controller.create);
route.post('/api/add-contact', control.create);
route.get('/api/records', controller.find);
route.put('/api/records/:id', controller.update);
route.delete('/api/records/:id', controller.delete);


module.exports = route