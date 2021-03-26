'use strict';

class Tag {

    constructor(data) {
        this.id = null;
        this.name = null;

        if (data && typeof data === 'object')
            this.fillWithData(data);
    }

    static isValid(tag) {
        let isValid = true;

        if(tag.id)
        {
            try {
                parseInt(tag.id);
            }
            catch (Error)
            {
                isValid = false;
            }
        }

        isValid &= (typeof tag.name === 'string');

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
        if(typeof this.id !== 'number')
        {
            try {
                this.id = parseInt(this.id);
            } catch (Error) {}
        }
    }
}

module.exports = Tag;