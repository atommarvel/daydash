const Promise = require('bluebird');

const TodoistSorter = require('../util/sort/TodoistSorter.js');
const StorageClient = require('./StorageClient.js');

const baseUrl = "https://todoist.com/api/v7";
// TODO: implement partial sync - https://app.asana.com/0/527712617898694/530378788983821/f

/**
 * In charge of interacting with Todoist APIs.
 * https://developer.todoist.com/
 */

class TodoistClient {

    constructor() {
        this.syncToken = "*";
    }

    getAPIKey() {
        if (this.apiKey) {
            return Promise.resolve(this.apiKey);
        }

        return StorageClient.getItem("todoKey")
            .then((items) => {
                this.apiKey = items.todoKey;
                if (this.apiKey.length === 0) console.log('todoist api key is missing');
                return this.apiKey;
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
        const url = `${baseUrl}/sync`;
        let headers = new Headers();
        headers.append('content-type','application/x-www-form-urlencoded');

        const body = await this.getSyncBody();
        const init = {
            method: 'POST',
            body: body,
            headers: headers
        };
        return fetch(url, init)
            .then(res => res.json());
    }

    async getThisWeeksItems() {
        const syncData = await this.sync();

        // filter out items that are assigned to a user that is not the current user
        const userId = syncData.user.id;
        const items = syncData.items.filter(item => {
            return item.responsible_uid === null || item.responsible_uid === userId
        });

        const sorter = new TodoistSorter(items);
        return {
            days: sorter.getOrganizedArr(),
            overdue: sorter.getOlderItems()
        };
    }


}

module.exports = TodoistClient;