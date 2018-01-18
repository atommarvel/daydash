const DayCell = require('./DayCell.js');

class WeekList extends React.Component {
    render() {
        return (
            <div>
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

module.exports = WeekList;