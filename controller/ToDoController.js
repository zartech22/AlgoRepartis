'use strict';

const ToDo = require('../model/entity/ToDo');

class ToDoController {
    getIndex(req, res) {
        res.json({title: 'Index', data: 'ToDoController'});
    }

    getTodo(req, res) {
        const id = req.params.id;

        global.todoRepository.getToDo(id).then(toDo => {
            res.json(toDo);
        }).catch(msg => {
            res.status(404);
            res.json({response: `No item found with id ${id}!`});
        });
    }

    createTodo(req, res) {
        const title = req.body.title;
        const dateBegin = req.body.dateBegin;
        const dateEnd = req.body.dateEnd;
        const status = req.body.status;
        const tags = req.body.tags;

        const todo = new ToDo({
            title: title,
            dateBegin: dateBegin,
            dateEnd: dateEnd,
            status: status,
            tags: tags
        });

        global.todoRepository.persist(todo).then(todo => {
            res.json({response: `New todo successfully created with id: ${todo.id}`});
        }).catch(msg => {
            res.status(400);
            res.json({response: `An error occurred while creating an new item. Error is "${msg}"`});
        });
    }

    updateTodo(req, res) {
        const id = req.params.id;

        const title = req.body.title;
        const dateBegin = req.body.dateBegin;
        const dateEnd = req.body.dateEnd;
        const status = req.body.status;
        const tags = req.body.tags;

        const todo = new ToDo({
            id: id,
            title: title,
            dateBegin: dateBegin,
            dateEnd: dateEnd,
            status: status,
            tags: tags
        });

        global.todoRepository.update(todo).then(() => {
            res.json({response: `Item with id ${id} successfully updated`});
        }).catch(msg => {
            res.status(400);
            res.json({response: `An error occurred while updating item with id ${id}. Error is "${msg}"`});
        });
    }

    deleteTodo(req, res) {
        const id = req.params.id;

        global.todoRepository.remove(id).then(() => res.json({response: `Item with id ${id} successfully removed!`})
        ).catch(msg => {
            res.status(400);
            res.json({response: `An error occurred while removing item with id ${id}. Error is "${msg}"`});
        });
    }
}

module.exports = ToDoController;