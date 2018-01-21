// In charge of interacting with GCal APIs
// https://developers.google.com/google-apps/calendar/
const Promise = require('bluebird');
const baseUrl = 'https://www.googleapis.com/calendar/v3';

class GCalClient {
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
                // this.calIds ? resolve(this.calIds) : reject();
                resolve(this.calIds);
            });
        });
    }

    getRequestedCalendars() {
        return Promise.join(this.fetchAllCalendars(), this.getCalNames(), (allCalendars, calNames) => {
                return allCalendars.filter(cal => calNames.indexOf(cal.summary) !== -1)
        });
    }

    fetchAllCalendars() {
        const url = `${baseUrl}/users/me/calendarList`;
        return this.getAccessToken()
            .then(token => {
                let headers = new Headers();
                headers.append('Authorization', `Bearer ${token}`);
                return {headers: headers};
            })
            .then(init => fetch(url, init))
            .then(res => res.json())
            .then(json => json.items);
    }


}

module.exports = GCalClient;