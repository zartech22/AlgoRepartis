'use strict';

const tagsRoute = require('express').Router();

const ApiController = require('../controller/TagsController');

const { getTags, getTag, createTag, updateTag, deleteTag } = new ApiController();

tagsRoute.get('/tags', getTags);

tagsRoute.get('/tag/:id', getTag);

tagsRoute.post('/tag', createTag);

tagsRoute.put('/tag/:id', updateTag);

tagsRoute.delete('/tag/:id', deleteTag);

module.exports = tagsRoute;