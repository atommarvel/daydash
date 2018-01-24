const DayCell = require('./DayCell.js');

class WeekList extends React.Component {

    constructor(props) {
        super(props);
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
                         todos={this.props.todos[ahead] || []}
                         events={this.props.events[ahead] || []}
                />
            )
        });

        return dayCells;
    }
}

module.exports = WeekList;