'use strict';

const AbstractTodoRepo = require('../ToDoRepository');
const ToDo = require('../../entity/ToDo');

class ToDoLowdbRepository extends AbstractTodoRepo {

    constructor(lowdb) {
        super();

        this.db = lowdb.get('todo');
    }

    /**
     * @override
     */
    getToDo(id) {
        return new Promise((resolve, reject) => {
            try {
                id = parseInt(id);

                const todo = this.db
                    .find({id: id})
                    .value();

                if(!todo)
                    reject(`No item found with id ${id}!`);
                else
                    resolve(new ToDo(todo));
            }
            catch (Error) {
                reject(`Invalid id format. Given "${id}", expected an integer`);
            }
        });
    }

    /**
     * @override
     */
    persist(todo) {
        return new Promise((resolve, reject) => {
            if(!ToDo.isValid(todo))
                return reject('Invalid data given!');

            let tagChecking = [];

            for(const tagId of todo.tags)
                tagChecking.push(global.tagsRepository.hasItem(tagId));

            Promise.allSettled(tagChecking).then(results => {
                let errorMsg = [];

                for(const res of results)
                    if(res.status === 'rejected')
                        errorMsg.push(res.reason);

                if(errorMsg.length !== 0)
                    return reject(errorMsg.join(', '));
            }).then(() => {
                this.getNextId().then(id => {
                    todo.id = id;

                    this.db.push(todo).write();

                    resolve(this.getToDo(todo.id));
                });
            });
        });
    }

    /**
     * @override
     */
    update(todo) {
        return new Promise((resolve, reject) => {
            if(!ToDo.isValid(todo))
                return reject('Invalid data given!');

            this.db.find({id: todo.id})
                .assign(todo)
                .write();

            resolve();
        });
    }

    /**
     * @override
     */
    remove(id) {
        try {
            id = parseInt(id);

            return this.hasItem(id).then(() => {
                this.db.remove({id: id})
                    .write();
            });
        } catch (Error) {
            return Promise.reject('Bad id');
        }
    }

    hasItem(id) {
        return new Promise((resolve, reject) => {

            try {
                id = parseInt(id);
            } catch (Error) { return reject('Bad id'); }

            const hasId = this.db.find({id: id}).value();

            if(!hasId)
                return reject(`No item found with id ${id}`);
            else
                resolve();
        });
    }

    getNextId() {
        return new Promise(resolve => {
            let nextId = this.db.orderBy('id', 'desc')
                .map('id')
                .take(1)
                .value();

            if(!nextId || nextId.length === 0)
                nextId = 0;
            else
                nextId = nextId[0] + 1;

            resolve(nextId);
        });
    }
}

module.exports = ToDoLowdbRepository;