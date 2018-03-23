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
                <GreetingView overdue={this.state.overdue} forceRefresh={this.forceRefresh}/>
                {this.renderOverdueItems()}
                <WeekList todos={this.state.todos} events={this.state.events} overdue={this.state.overdue}/>
            </div>
            );
    }

    componentDidMount() {
        this.getData()
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
        this.setState({events: res.events});
    }

    updateTodoState(res) {
        this.setState({todos: res.items.days, overdue: res.items.overdue || []});
    }
}

// wrapper to save myself 22 characters to call this
function ping(msg, cb) {
    chrome.runtime.sendMessage(msg, cb);
}

module.exports = App;