const moment = require('moment');
const cacheLifeMin = 5;

class EventCache {

    setEvents(events) {
        this.setCache('event', events);
        this.setExpiration('event', moment().add(cacheLifeMin, 'm'));
    }

    getEventCache() {
        return this.getCache('event');
    }

    isEventCacheStale() {
        return this.isExpired('event');
    }

    setTodos(todos) {
        this.setCache('todo', todos);
        this.setExpiration('todo', moment().add(cacheLifeMin, 'm'));
    }

    getTodoCache() {
        return this.getCache('todo');
    }

    isTodoCacheStale() {
        return this.isExpired('todo');
    }

    setExpiration(type, expiration) {
        localStorage[`${type}Expiration`] = expiration.format();
    }

    isExpired(type) {
        let exp = localStorage[`${type}Expiration`];
        if (!exp) {
            return true
        }
        exp = moment(exp);
        return exp.isBefore(moment());
    }

    setCache(type, data) {
        localStorage[`${type}Cache`] = JSON.stringify(data);
    }

    getCache(type) {
        if (localStorage[`${type}Cache`]) {
            return JSON.parse(localStorage[`${type}Cache`]);
        }
    }
}

module.exports = EventCache;