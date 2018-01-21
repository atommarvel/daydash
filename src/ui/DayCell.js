const TodoView = require('./TodoList.js');
const CalView = require('./CalendarList.js');
const moment = require('moment');

class DayCell extends React.Component {
    render() {
        return (
            <div className={"day"}>
                <h2>{moment().add(this.props.daysAhead, 'd').format("dddd")}</h2>
                <TodoView todos={this.props.todos}/>
                <CalView events={this.props.events}/>
            </div>
        );
    }
}

module.exports = DayCell;