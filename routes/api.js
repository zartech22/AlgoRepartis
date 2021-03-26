'use strict';

const apiRoute = require('express').Router();

const todoRoutes = require('./todo');
const tagsRoutes = require('./tags');

apiRoute.use(todoRoutes);
apiRoute.use(tagsRoutes);

module.exports = apiRoute;