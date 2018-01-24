const WeekList = require('./WeekList.js');
const GreetingView = require('./GreetingView.js');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {todos: [], events: [], overdue: []};
    }

    render() {
        return (
            <div>
                <GreetingView overdue={this.state.overdue}/>
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
}

module.exports = App;