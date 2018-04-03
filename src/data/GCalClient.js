// In charge of interacting with GCal APIs
// https://developers.google.com/google-apps/calendar/
const Promise = require('bluebird');
const moment = require('moment');
const ItemDayOrganizer = require('./ItemDayOrganizer.js');
const StorageClient = require('./StorageClient.js');
const baseUrl = 'https://www.googleapis.com/calendar/v3';

class GCalClient {

    constructor() {
        this.reqCals = [];
        this.events = [[],[],[],[],[],[],[]];
    }

    getAccessToken() {
        return new Promise((resolve, reject) => {
            chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(token);
                }
            });
        });
    }

    getCalNames() {
        return StorageClient.get({calIds: ""})
            .then((result) => {
                console.log(result.calIds);
                return result.calIds.split(',');
            });
    }

    async getRequestedCalendars() {
        // TODO: check if the cal names from options have changed
        // if (this.reqCals.length > 0) return Promise.resolve(this.reqCals);
        const allCalendars = await this.fetchAllCalendars();
        const calNames = await this.getCalNames();
        const reqCals = allCalendars.filter(cal => calNames.indexOf(cal.id) !== -1);
        return reqCals;
    }

    async fetchThisWeeksEvents() {
        const cals = await this.getRequestedCalendars();

        return Promise.map(cals, this.fetchEventsForCal.bind(this))
            .then(this.flatten)
            .then(events => {
                const itemOrganizer = new ItemDayOrganizer(events, true);
                return itemOrganizer.getOrganizedArr();
            })
    }

    flatten(arr) {
        return Array.prototype.concat(...arr);
    }

    fetchEventsForCal(cal) {
        const api = `${baseUrl}/calendars/${cal.id}/events`;
        const timeMin = `timeMin=${moment().startOf('day').format()}`;
        const timeMax = `timeMax=${moment().endOf('day').add(6,'d').format()}`;
        const url = `${api}?${timeMin}&${timeMax}`;
        return this.getAuthHeaders()
            .then(headers => {
                return {headers: headers};
            })
            .then(init => fetch(url, init))
            .then(res => res.json())
            .then(events => events.items);
    }

    fetchAllCalendars() {
        const url = `${baseUrl}/users/me/calendarList`;
        return this.getAuthHeaders()
            .then(headers => {
                return {headers: headers};
            })
            .then(init => fetch(url, init))
            .then(res => res.json())
            .then(json => json.items);
    }

    async getAuthHeaders(headers) {
        if (!headers) {
            headers = new Headers();
        }
        const token = await this.getAccessToken();
        headers.append('authorization', `Bearer ${token}`);
        return headers;
    }

}

module.exports = GCalClient;