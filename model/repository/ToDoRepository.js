'use strict';

class AbstractToDoRepository {
    /**
     *
     * @param {int} id
     * @return Promise<ToDo>
     */
    getToDo(id) {
        throw new Error('Calling abstract method!');
    }

    /**
     *
     * @param {ToDo} todo
     * @return Promise<ToDo>
     */
    persist(todo) {
        throw new Error('Calling abstract method!');
    }

    /**
     *
     * @param {ToDo} todo
     * @return Promise
     */
    update(todo) {
        throw new Error('Calling abstract method!');
    }

    /**
     *
     * @param {int} id
     * @return Promise
     */
    remove(id) {
        throw new Error('Calling abstract method!');
    }

    /**
     * @param id
     * @return {Promise}
     */
    hasItem(id) {
        throw new Error('Calling abstract method!');
    }
}

module.exports = AbstractToDoRepository;