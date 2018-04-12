const WeekList = require('./WeekList.js');
const GreetingView = require('./GreetingView.js');
const TodoList = require('./TodoList.js');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {todos: [], events: [], overdue: []};
        this.bindFuncs();
    }

    bindFuncs() {
        this.forceRefresh = this.forceRefresh.bind(this);
        this.updateEventState = this.updateEventState.bind(this);
        this.updateTodoState = this.updateTodoState.bind(this);
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderOverdueItems()}
                <WeekList todos={this.state.todos} events={this.state.events} overdue={this.state.overdue}/>
            </div>
            );
    }

    componentDidMount() {
        this.getData();
        this.initListeners();
    }

    renderHeader() {
        return (
            <div className={"header"}>
                <GreetingView forceRefresh={this.forceRefresh}/>
                {this.renderLoadingView()}
            </div>
        );
    }

    renderLoadingView() {
        let result;
        if (this.state.areEventsStale || this.state.areTodosStale) {
            result = (<img id={"loading"} src={"/img/refresh.svg"}/>);
        }
        return result;
    }

    renderOverdueItems() {
        if (this.state.overdue.length > 0) {
            return (
                <div className="overdue">
                    <TodoList todos={this.state.overdue} header={this.renderOverdueItemsHeader()}/>
                </div>

            );
        }
    }

    renderOverdueItemsHeader() {
        return <div>You've got overdue items!</div>
    }

    forceRefresh() {
        this.getData(true);
    }

    getData(force = false) {
        ping({fetchCalEvents: true, force: force}, this.updateEventState);
        ping({fetchTodos: true, force: force}, this.updateTodoState);
    }

    updateEventState(res) {
        this.setState({events: res.events, areEventsStale: res.areEventsStale});
    }

    updateTodoState(res) {
        this.setState({todos: res.items.days, overdue: res.items.overdue || [], areTodosStale: res.areTodosStale});
    }

    initListeners() {
        chrome.runtime.onMessage.addListener((message, sender, cb) => {
            if (message.updateEventState) {
                this.updateEventState(message.eventData);
            }
            if (message.updateTodoState) {
                this.updateTodoState(message.todoData);
            }
        });
    }
}

// wrapper to save myself 22 characters to call this
function ping(msg, cb) {
    chrome.runtime.sendMessage(msg, cb);
}


module.exports = App;