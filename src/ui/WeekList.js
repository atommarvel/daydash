const DayCell = require('./DayCell.js');
const TodoistClient = require('../data/TodoistClient');
const GCalClient = require('../data/GCalClient.js');

class WeekList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
        this.todoClient = new TodoistClient();
        this.gcalClient = new GCalClient();
    }

    componentDidMount() {
        this.todoClient.getThisWeeksItems().then(items => {
            this.setState({todos: items});
        });

        this.gcalClient.fetchThisWeeksEvents().then(console.log);
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
                <DayCell key={ahead.toString()} daysAhead={ahead} todos={this.state.todos[ahead] || []}/>
            )
        });

        return dayCells;
    }
}

module.exports = WeekList;