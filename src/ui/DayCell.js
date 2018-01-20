const TodoView = require('./TodoList.js');
const CalView = require('./CalView.js');

class DayCell extends React.Component {
    render() {
        return (
            <div className={"day"}>
                {this.props.daysAhead}
                <TodoView todos={this.props.todos}/>
                <CalView/>
            </div>
        );
    }
}

module.exports = DayCell;