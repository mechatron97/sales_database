const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');
const controller2 = require('../controller/controller2');
const controller3 = require('../controller/controller3');
const emails = require('../controller/emails');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

route.get('/emails', services.emails);
route.get('/records', services.records);
route.get('/contacts', services.contacts);
route.get('/locations', services.locations);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-record', services.add_record);
route.get('/add-contact', services.add_contact);
route.get('/add-location', services.add_location);
route.get('/add-email', services.add_email);

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-record', services.update_record);
route.get('/update-contact', services.update_contact);
route.get('/update-location', services.update_location);
route.get('/update-email', services.update_email);

// API
route.post('/api/records', controller.create);
route.post('/api/contacts', controller2.create);
route.post('/api/locations', controller3.create);
route.post('/api/emails', emails.create);

route.get('/api/', controller.find);
route.get('/api/emails', emails.find);
route.get('/api/records', controller.find);
route.get('/api/contacts', controller2.find);
route.get('/api/locations', controller3.find);

route.put('/api/records/:id', controller.update);
route.put('/api/contacts/:id', controller2.update);
route.put('/api/locations/:id', controller3.update);
route.put('/api/emails/:id', emails.update);

route.delete('/api/records/:id', controller.delete);
route.delete('/api/contacts/:id', controller2.delete);
route.delete('/api/locations/:id', controller3.delete);
route.delete('/api/emails/:id', emails.delete);


module.exports = route