const Promise = require('bluebird');
const moment = require('moment');

const GCalSorter = require('../util/sort/GCalSorter.js');
const StorageClient = require('./StorageClient.js');

const baseUrl = 'https://www.googleapis.com/calendar/v3';

/**
 * In charge of interacting with Google Calendar APIs
 * https://developers.google.com/google-apps/calendar/
 */

class GCalClient {

    constructor() {
        // The calendars that should be queried for events.
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
        return StorageClient.getItem("calIds")
            .then((result) => result.calIds.split(','));
    }

    async getRequestedCalendars(force = false) {
        // Don't bother re-fetching requested calendars unless they are missing or the request is forced
        if (this.reqCals.length > 0 && !force) return Promise.resolve(this.reqCals);
        const allCalendars = await this.fetchAllCalendars();
        const calNames = await this.getCalNames();
        return  allCalendars.filter(cal => calNames.indexOf(cal.id) !== -1);
    }

    async fetchThisWeeksEvents(force = false) {
        const cals = await this.getRequestedCalendars(force);

        return Promise.map(cals, this.fetchEventsForCal.bind(this))
            .then(this.flatten)
            .then(events => {
                const sorter = new GCalSorter(events);
                return sorter.getOrganizedArr();
            });
    }

    flatten(arr) {
        return Array.prototype.concat(...arr);
    }

    fetchEventsForCal(cal) {
        const api = `${baseUrl}/calendars/${cal.id}/events`;
        const timeMin = `timeMin=${moment().startOf('day').format()}`;
        const timeMax = `timeMax=${moment().endOf('day').add(6,'d').format()}`;
        const url = `${api}?${timeMin}&${timeMax}`;
        return this.sendAuthenticatedRequest(url);
    }

    fetchAllCalendars() {
        const url = `${baseUrl}/users/me/calendarList`;
        return this.sendAuthenticatedRequest(url);
    }

    sendAuthenticatedRequest(url) {
        return this.getAuthHeaders()
            .then(headers => {return {headers: headers}})
            .then(init => fetch(url, init))
            .then(res => res.json())
            .then(json => json.items);
    }

    async getAuthHeaders(headers = new Headers()) {
        const token = await this.getAccessToken();
        headers.append('authorization', `Bearer ${token}`);
        return headers;
    }

    clearCachedCalendars() {
        this.reqCals = [];
    }

}

module.exports = GCalClient;