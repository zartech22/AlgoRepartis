'use strict';

const ToDoLowdbRepository = require('./model/repository/ToDo/ToDoLowdbRepository');
const TagsLowdbRepository = require('./model/repository/Tags/TagsLowdbRepository');

/**** Init low db ****/
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
/**** Init low db ****/

/*/!**** Init data ****!/
const userList = require('./models/dummyData/userData.json');
const gameList = require('./models/dummyData/gameData.json');
/!**** Init data ****!/

const User = require('./models/entities/User');
const Game = require('./models/entities/Game');*/

/**
 * Init low db with default structure
 * @param db
 */
function initDb(db) {
    db.defaults({
        todo: [],
        tags: []
    }).write();
}

/**
 * Import some init data inside the model
 * @returns {Promise}
 */
function importInitData() {
    const promisesList = [];

    for (const userData of userList) {
        promisesList.push(global.userRepository.hasUser(userData.pseudo)
            .then(res => {
                if (res === false)
                    global.userRepository.addUser(new User(userData));
            }));
    }

    for (const gameData of gameList) {

        promisesList.push(global.gameRepository.hasGame(gameData.name)
            .then(res => {
                if (res === false)
                    global.gameRepository.addGame(new Game(gameData));
            }));
    }

    return Promise.all(promisesList);
}

/**
 * Init the app with the needed repository according to the environment set in .env file
 * @returns {Promise<void>}
 */
async function init() {
    // If prod: use low db repositories
    /*if (process.env.ENV === 'prod') {
        const db = low(adapter);
        initDb(db);

        global.userRepository = new UserLowdbRepository(db);
        global.gameRepository = new GameLowdbRepository(db);
    } else { // In other cases (including dev) use Map based repositories
        global.userRepository = new UserMapRepository();
        global.gameRepository = new GameMapRepository();
    }*/

    const db = low(adapter);
    initDb(db);

    global.todoRepository = new ToDoLowdbRepository(db);
    global.tagsRepository = new TagsLowdbRepository(db);

    // Import data from the files via the repositories
    // await importInitData();
}

module.exports = init;