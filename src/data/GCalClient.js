// In charge of interacting with GCal APIs
// https://developers.google.com/google-apps/calendar/
const Promise = require('bluebird');
const moment = require('moment');
const baseUrl = 'https://www.googleapis.com/calendar/v3';

class GCalClient {

    constructor() {
        this.reqCals = [];
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
        if (this.calIds) {
            return Promise.resolve(this.calIds);
        }

        return new Promise((resolve, reject) => {
            chrome.storage.sync.get({
                calIds: ""
            }, function(items) {
                this.calIds = items.calIds.split(',');
                if (this.calIds.length === 0) console.log('Calendar Names key is missing.');
                this.calIds ? resolve(this.calIds) : reject();
                resolve(this.calIds);
            });
        });
    }

    async getRequestedCalendars() {
        // TODO: check if the cal names from options have changed
        if (this.reqCals.length > 0) return Promise.resolve(this.reqCals);
        const allCalendars = await this.fetchAllCalendars();
        const calNames = await this.getCalNames();
        this.reqCals = allCalendars.filter(cal => calNames.indexOf(cal.summary) !== -1)
        return Promise.resolve(this.reqCals);
    }

    async fetchThisWeeksEvents() {
        const cals = await this.getRequestedCalendars();
        const cal = cals[1]; // TODO: iterate over all calendars
        const api = `${baseUrl}/calendars/${cal.id}/events`;
        const timeMin = `timeMin=${moment().startOf('day').format()}`;
        const timeMax = `timeMax=${moment().endOf('day').add(6,'d').format()}`;
        const url = `${api}?${timeMin}&${timeMax}`;
        return this.getAuthHeaders()
            .then(headers => {
                return {headers: headers};
            })
            .then(init => fetch(url, init))
            .then(res => res.json());
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
        console.log(token);
        headers.append('authorization', `Bearer ${token}`);
        console.log(headers);
        return headers;
    }

}

module.exports = GCalClient;