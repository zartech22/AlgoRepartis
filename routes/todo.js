'use strict';

const todoRoute = require('express').Router();

const ApiController = require('../controller/ToDoController');

const { createTodo, deleteTodo, getTodo, updateTodo } = new ApiController();

// todoRoute.get('/todo/:id', (req, res) => controller.getTodo(req, res));
todoRoute.get('/todo/:id', getTodo);

todoRoute.post('/todo', createTodo);

todoRoute.put('/todo/:id', updateTodo);

todoRoute.delete('/todo/:id', deleteTodo);

module.exports = todoRoute;