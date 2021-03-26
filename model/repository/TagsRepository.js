'use strict';

const Tag = require('../entity/Tag');

class AbstractTagsRepository {

    /**
     *
     * @param {int} id
     * @return Promise<Tag>
     */
    getTag(id) {
        throw new Error('Calling abstract method!');
    }

    /**
     *
     * @return Promise<[Tag]>
     */
    getTags() {
        throw new Error('Calling abstract method!');
    }

    /**
     *
     * @param {Tag} tag
     * @return Promise<Tag>
     */
    persist(tag) {
        throw new Error('Calling abstract method!');
    }

    /**
     *
     * @param {Tag} tag
     * @return Promise
     */
    update(tag) {
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

module.exports = AbstractTagsRepository;