// In charge of interacting with GCal APIs
// https://developers.google.com/google-apps/calendar/
const Promise = require('bluebird');
const baseUrl = 'https://www.googleapis.com/calendar/v3';

class GCalClient {
    getAccessToken() {
        return new Promise((resolve, reject) => {
            chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
                // Use the token.
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(token);
                }
            });
        });
    }

    fetchCalendarIds() {
        const url = `${baseUrl}/users/me/calendarList`;
        Promise.join();
        this.getAccessToken()
            .then(token => {
                let headers = new Headers();
                headers.append('Authorization', `Bearer ${token}`);
                return {headers: headers};
            })
            .then(init => fetch(url, init))
            .then(res => res.json())
            .then(console.log);
    }
}

module.exports = GCalClient;