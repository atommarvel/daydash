const TodoList = require('./TodoList.js');

class GreetingView extends React.Component {
    render() {
        return (
            <div className="greet">
                <h1>Hello, Daydash!</h1>
                {this.renderOverdueItems()}
            </div>
        );
    }

    renderOverdueItems() {
        if (this.props.overdue.length > 0) {
            return (
                <div>
                    You've got overdue items!
                    <TodoList todos={this.props.overdue}/>
                </div>

            );
        }
    }
}

module.exports = GreetingView;