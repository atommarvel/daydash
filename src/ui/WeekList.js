const DayCell = require('./DayCell.js');

class WeekList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {todos: [], events: []};
    }

    componentDidMount() {
        chrome.runtime.sendMessage({fetchTodos: true}, res => {
            this.setState({todos: res.items});
        });

        chrome.runtime.sendMessage({fetchCalEvents: true}, res => {
            this.setState({events: res.events});
        });
    }

    render() {
        return (
            <div className="week">
                {this.dayCellsToRender()}
            </div>
        );
    }

    dayCellsToRender() {
        const daysAhead = [0,1,2,3,4,5,6];
        const dayCells = daysAhead.map(ahead => {
            return (
                <DayCell key={ahead.toString()}
                         daysAhead={ahead}
                         todos={this.state.todos[ahead] || []}
                         events={this.state.events[ahead] || []}
                />
            )
        });

        return dayCells;
    }
}

module.exports = WeekList;