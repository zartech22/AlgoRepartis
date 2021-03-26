'use strict';

const AbstractTagRepo = require('../TagsRepository');
const Tag = require('../../entity/Tag');

class TagsLowdbRepository extends AbstractTagRepo {

    constructor(lowdb) {
        super();

        this.db = lowdb.get('tags');
    }

    /**
     * @override
     */
    getTag(id) {
        return new Promise((resolve, reject) => {
            try {
                id = parseInt(id);

                const tag = this.db
                    .find({id: id})
                    .value();

                if(!tag)
                    return reject(`No item found with id ${id}!`);
                else
                    resolve(new Tag(tag));
            }
            catch (Error) {
                return reject(`Invalid id format. Given "${id}", expected an integer`);
            }
        });
    }

    /**
     * @override
     */
    getTags() {
        return Promise.resolve(this.db.value());
    }

    /**
     * @override
     */
    persist(tag) {
        return new Promise((resolve, reject) => {
            if(!Tag.isValid(tag))
                return reject('Invalid data given!');

            this.getNextId().then(id => {
                tag.id = id;

                this.db.push(tag).write();

                resolve(this.getTag(tag.id));
            });
        });
    }

    /**
     * @override
     */
    update(todo) {
        return new Promise((resolve, reject) => {
            if(!Tag.isValid(todo))
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

    /**
     * @override
     */
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

module.exports = TagsLowdbRepository;