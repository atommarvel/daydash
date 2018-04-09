const GCalClient = require('./data/GCalClient.js');
const TodoistClient = require('./data/TodoistClient.js');
const EventCache = require('./data/EventCache.js');

const calClient = new GCalClient();
const calCache = new EventCache("event");
const todoClient = new TodoistClient();
const todoCache = new EventCache("todo");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        if (request.fetchTodos) {
            return fetchTodos(request, sendResponse);
        } else if (request.fetchCalEvents) {
            return fetchCalEvents(request, sendResponse);
        } else if (request.onOptionsUpdated) {
            return onOptionsUpdated();
        }
        return true;
});

function fetchTodos(req, cb) {
    let isStale = false;
    if (todoCache.isStale() || req.force) {
        isStale = true;
        todoClient.getThisWeeksItems()
            .then(items => {
                console.log(items);
                todoCache.set(items);
                ping({updateTodoState: true, todoData: {items: items, areTodosStale: false}});
            });
    }
    cb({items: todoCache.get([]), areTodosStale: isStale});
    return false;
}

function fetchCalEvents(req, cb) {
    let isStale = false;
    if (calCache.isStale() || req.force) {
        isStale = true;
        calClient.fetchThisWeeksEvents(req.force)
            .then(events => {
                console.log(events);
                calCache.set(events);
                ping({updateEventState: true, eventData: {events: events, areEventsStale: false}});
            });
    }
    cb({events: calCache.get([]), areEventsStale: isStale});
    return false;
}

function onOptionsUpdated() {
    calClient.clearCachedCalendars();
}

function ping(msg, cb) {
    chrome.runtime.sendMessage(msg, cb);
}