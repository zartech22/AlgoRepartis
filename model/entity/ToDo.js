'use strict';

const moment = require('moment');

const STATUS = [
    'Non précisé',
    'Une tâche est recquise',
    'En cours',
    'Achevée',
    'Annulée'
];

class ToDo {

    constructor(data) {
        this.id = null;
        this.title = null;
        this.dateBegin = null;
        this.dateEnd = null;
        this.status = null;
        this.tags = [];

        if (data && typeof data === 'object')
            this.fillWithData(data);
    }

    static get STATUS() {
        return STATUS;
    }

    static isValid(todo) {
        let isValid = true;

        if(todo.id)
        {
            try {
                parseInt(todo.id);
            }
            catch (Error)
            {
                isValid = false;
            }
        }

        isValid &= (typeof todo.title === 'string');
        isValid &= (todo.dateBegin instanceof Date);
        isValid &= (todo.dateEnd instanceof Date);
        isValid &= (STATUS.indexOf(todo.status) !== -1);
        isValid &= (Array.isArray(todo.tags) && todo.tags.every(elem => typeof elem === 'number'));

        return isValid;
    }

    /**
     * Fill the current object from given data
     *
     * This function only fills fields from given data that matches fields of User. Other fields are ignored
     *
     * @param {Object} data Object containing the data to set to the current user
     * @param {String} [data.name] The game name
     * @param {Number} [data.highscore] The highest score for this game
     * @param {String} [data.user] Username of the player holding the highest score
     */
    fillWithData(data) {
        for (const key in data)
            if (this.hasOwnProperty(key))
                this[key] = data[key];

        this.formatData();
    }

    formatData() {

        this.dateBegin = this.formatDate(this.dateBegin);
        this.dateEnd = this.formatDate(this.dateEnd);

        if(typeof this.id !== 'number')
        {
            try {
                this.id = parseInt(this.id);
            } catch (Error) {}
        }
    }

    formatDate(date) {
        const regExp = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;

        if(!(date instanceof Date))
        {
            if(typeof date === 'string' && date.match(regExp))
                date = moment(date, 'DD/MM/YYYY').toDate();
            else if(typeof date === 'string')
            {
                try {
                    date = Date.parse(date);
                } catch (Error) {}
            }
        }

        return date;
    }
}

module.exports = ToDo;