const express = require('express');
const routes = express.Router();
const homeController = require('./src/controllers/homeController');
const authController = require('./src/controllers/authController');
const contactController = require('./src/controllers/contactController');
const {loginRequired} = require('./src/middlewares/authMiddlewares')

//Home routes
routes.get('/', homeController.index);

//Login routes
routes.get('/login', authController.index);
routes.post('/login/register', authController.registerUser);
routes.post('/login/sign-in', authController.loginUser);
routes.get('/logout', authController.logoutUser);

//Contact routes
routes.get('/contact', loginRequired, contactController.index);
routes.post('/contact/save-contact', loginRequired, contactController.saveContact);
routes.get('/contact/:id', loginRequired, contactController.editIndex);
routes.post('/contact/edit/:id', loginRequired, contactController.editContact);
routes.get('/contact/delete/:id', loginRequired, contactController.deleteContact);

module.exports = routes;
