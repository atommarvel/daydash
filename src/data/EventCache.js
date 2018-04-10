const moment = require('moment');
const cacheLifeMin = 5;

/**
 * Manages data in local storage associated with the key provided in the constructor.
 * Will also track data expiration.
 */

class EventCache {

    constructor(key) {
        this.key = key;
    }

    set(item) {
        this.setCache(item);
        this.setExpiration(moment().add(cacheLifeMin, 'm'));
    }

    get(def) {
        return this.getCache(def);
    }

    isStale() {
        return this.isExpired();
    }

    setExpiration(expiration) {
        localStorage[`${this.key}Expiration`] = expiration.format();
    }

    isExpired() {
        let exp = localStorage[`${this.key}Expiration`];
        if (!exp) {
            return true
        }
        exp = moment(exp);
        return exp.isBefore(moment());
    }

    setCache(data) {
        localStorage[`${this.key}Cache`] = JSON.stringify(data);
    }

    getCache(def) {
        if (localStorage[`${this.key}Cache`]) {
            return JSON.parse(localStorage[`${this.key}Cache`]);
        } else {
            return def;
        }
    }
}

module.exports = EventCache;