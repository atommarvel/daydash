const DayCell = require('./DayCell.js');
const TodoistClient = require('../data/TodoistClient');

class WeekList extends React.Component {
    render() {
        return (
            <div className="week">
                Week
                {this.dayCellsToRender()}
            </div>
        );
    }

    dayCellsToRender() {
        const daysAhead = [0,1,2,3,4,5,6];
        const dayCells = daysAhead.map(ahead => {
            return (
                <DayCell key={ahead.toString()} daysAhead={ahead}/>
            )
        });

        return dayCells;
    }
}

const client = new TodoistClient();
client.getThisWeeksItems().then(console.log);

module.exports = WeekList;