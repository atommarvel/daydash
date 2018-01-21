const GCalClient = require('./data/GCalClient.js');
const TodoistClient = require('./data/TodoistClient.js');

const calClient = new GCalClient();
const todoClient = new TodoistClient();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        if (request.fetchTodos) {
            fetchTodos(sendResponse);
        } else if (request.fetchCalEvents) {
            fetchCalEvents(sendResponse);
        }
        return true;
});

function fetchTodos(cb) {
    todoClient.getThisWeeksItems()
        .then(items => {
            console.log(items);
            cb({items: items});
        })
}

function fetchCalEvents(cb) {
    calClient.fetchThisWeeksEvents()
        .then(events => {
            console.log(events);
            cb({events: events});
        });
}