const WeekList = require('./WeekList.js');
const GreetingView = require('./GreetingView.js');
const TodoList = require('./TodoList.js');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {todos: [], events: [], overdue: []};
    }

    render() {
        return (
            <div>
                <GreetingView overdue={this.state.overdue}/>
                {this.renderOverdueItems()}
                <WeekList todos={this.state.todos} events={this.state.events} overdue={this.state.overdue}/>
            </div>
            );
    }

    componentDidMount() {
        chrome.runtime.sendMessage({fetchTodos: true}, res => {
            this.setState({todos: res.items.days, overdue: res.items.overdue || []});
        });

        chrome.runtime.sendMessage({fetchCalEvents: true}, res => {
            this.setState({events: res.events});
        });
    }

    renderOverdueItems() {
        if (this.state.overdue.length > 0) {
            return (
                <div className="overdue">
                    <TodoList todos={this.state.overdue} header={<div>You've got overdue items!</div>}/>
                </div>

            );
        }
    }
}

module.exports = App;