const TodoView = require('./TodoView.js');
const CalView = require('./CalView.js');

class DayCell extends React.Component {
    render() {
        return (
            <div className={"day"}>
                {this.props.daysAhead}
                <TodoView/>
                <CalView/>
            </div>
        );
    }
}

module.exports = DayCell;