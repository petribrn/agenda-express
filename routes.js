const express = require('express');
const routes = express.Router();
const homeController = require('./src/controllers/homeController');

//Home routes
routes.get('/', homeController.index);

module.exports = routes;
