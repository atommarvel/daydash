const GCalClient = require('./data/GCalClient.js');
const TodoistClient = require('./data/TodoistClient.js');
const EventCache = require('./data/EventCache.js');

const calClient = new GCalClient();
const todoClient = new TodoistClient();
const eventCache = new EventCache();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        if (request.fetchTodos) {
            return fetchTodos(sendResponse);
        } else if (request.fetchCalEvents) {
            return fetchCalEvents(sendResponse);
        }
        return true;
});

function fetchTodos(cb) {
    if (eventCache.isTodoCacheStale()) {
        todoClient.getThisWeeksItems()
            .then(items => {
                console.log(items);
                eventCache.setTodos(items);
                cb({items: items});
            });
        return true;
    } else {
        cb({items: eventCache.getTodoCache()})
    }
    return false;
}

function fetchCalEvents(cb) {
    if (eventCache.isEventCacheStale()) {
        calClient.fetchThisWeeksEvents()
            .then(events => {
                console.log(events);
                eventCache.setEvents(events);
                cb({events: events});
            });
        return true;
    } else {
        cb({events: eventCache.getEventCache()});
    }
    return false;
}