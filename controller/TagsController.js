'use strict';

const Tag = require('../model/entity/Tag');

class TagController {

    getTags(req, res) {
        global.tagsRepository.getTags().then(tags => {
            res.json({response: tags});
        }).catch(msg => {
            res.status(400);
            res.json({response: `An error occurred while retrieving the tag list. Error is: "${msg}"`});
        });
    }

    getTag(req, res) {
        const id = req.params.id;

        global.tagsRepository.getTag(id).then(toDo => {
            res.json(toDo);
        }).catch(msg => {
            res.status(404);
            res.json({response: `No item found with id ${id}!`});
        });
    }

    createTag(req, res) {
        const name = req.body.name;

        const tag = new Tag({
            name: name
        });

        global.tagsRepository.persist(tag).then(tag => {
            res.json({response: `New todo successfully created with id: ${tag.id}`});
        }).catch(msg => {
            res.status(400);
            res.json({response: `An error occurred while creating an new item. Error is "${msg}"`});
        });
    }

    updateTag(req, res) {
        const id = req.params.id;

        const name = req.body.name;

        const tag = new Tag({
            id: id,
            name: name
        });

        global.tagsRepository.update(tag).then(() => {
            res.json({response: `Item with id ${id} successfully updated`});
        }).catch(msg => {
            res.status(400);
            res.json({response: `An error occurred while updating item with id ${id}. Error is "${msg}"`});
        });
    }

    deleteTag(req, res) {
        const id = req.params.id;

        global.tagsRepository.remove(id).then(() => res.json({response: `Item with id ${id} successfully removed!`}))
            .catch(msg => {
            res.status(400);
            res.json({response: `An error occurred while removing item with id ${id}. Error is "${msg}"`});
        });
    }
}

module.exports = TagController;