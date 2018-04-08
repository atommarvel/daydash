const TodoList = require('./TodoList.js');

class GreetingView extends React.Component {
    render() {
        return (
            <span className="greet">
                <h1 id={"refresh"} onClick={this.props.forceRefresh}><u>Hello, Daydash!</u></h1>
            </span>
        );
    }
}

module.exports = GreetingView;