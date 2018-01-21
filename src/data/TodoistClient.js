// In charge of interacting with Todoist APIs
// https://developer.todoist.com/
const Promise = require('bluebird');
const moment = require('moment');
const ItemDayOrganizer = require('./ItemDayOrganizer.js');
const cacheExpMin = 5;
// TODO: implement partial sync

class TodoistClient {
    constructor() {
        this.syncToken = "*";
        this.allItems = {};
        this.items = [{},{},{},{},{},{},{}];
        this.cacheStamp = moment();
    }

    getAPIKey() {
        if (this.apiKey) {
            return Promise.resolve(this.apiKey);
        }

        return new Promise((resolve, reject) => {
            chrome.storage.sync.get({
                todoKey: ""
            }, function(items) {
                this.apiKey = items.todoKey;
                if (this.apiKey.length === 0) console.log('todoist api key is missing');
                this.apiKey ? resolve(this.apiKey) : reject();
            });
        });
    }

    async getSyncBody() {
        const apiKey = await this.getAPIKey();
        const tokenParam = `token=${apiKey}`;
        const sync_tokenParam = `sync_token=${this.syncToken}`;
        const resource_typeParam = `resource_types=["all"]`;
        return `${tokenParam}&${sync_tokenParam}&${resource_typeParam}`;
    }

    async sync() {
        const url = 'https://todoist.com/api/v7/sync';
        let headers = new Headers();
        headers.append('content-type','application/x-www-form-urlencoded');

        const body = await this.getSyncBody();
        const init = {
            method: 'POST',
            body: body,
            headers: headers
        };
        this.cacheExpires = moment().add(cacheExpMin, 'm');
        return fetch(url, init)
            .then(res => res.json());
    }

    async getThisWeeksItems() {
        if (moment().isBefore(this.cacheExpires)) Promise.resolve(this.items);
        const syncData = await this.sync();
        const organizer = new ItemDayOrganizer(syncData.items, false);
        return organizer.getOrganizedArr();
    }
}

module.exports = TodoistClient;