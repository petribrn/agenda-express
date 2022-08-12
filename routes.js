const express = require('express');
const routes = express.Router();
const homeController = require('./src/controllers/homeController');
const authController = require('./src/controllers/authController');

//Home routes
routes.get('/', homeController.index);

//Login routes
routes.get('/login', authController.index);
routes.post('/login/register', authController.registerUser);
routes.post('/login/sign-in', authController.loginUser);
routes.get('/logout', authController.logoutUser);

module.exports = routes;
