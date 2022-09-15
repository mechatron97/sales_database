const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');
const emails = require('../controller/emails');
const details = require('../controller/details');
const authController = require('../controller/authController');
const { checkUser, requireAuth } = require('../../middleware/authMiddleware');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

route.get('/emails', checkUser, requireAuth, services.emails);
route.get('/records', checkUser, requireAuth, services.records);
route.get('/details', checkUser, requireAuth, services.details);
route.get('/register', authController.register_get);
route.get('/login', authController.login_get);
route.get('/logout', authController.logout_get);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-record', services.add_record);
route.get('/add-email', services.add_email);
route.get('/add-details', services.add_details);

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-record', services.update_record);
route.get('/update-email', services.update_email);
route.get('/update-details', services.update_details);
// API
route.post('/api/records', controller.create);
route.post('/api/emails', emails.create);
route.post('/api/details', details.create);

route.post('/register', authController.register_post);
route.post('/login', authController.login_post);

route.get('/api/', controller.find);
route.get('/api/emails', emails.find);
route.get('/api/records', controller.find);
route.get('/api/details', details.find);

route.put('/api/records/:id', controller.update);
route.put('/api/emails/:id', emails.update);
route.put('/api/details/:id', details.update);

route.delete('/api/records/:id', controller.delete);
route.delete('/api/emails/:id', emails.delete);
route.delete('/api/details/:id', details.delete);


module.exports = route