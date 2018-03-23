const TodoList = require('./TodoList.js');

class GreetingView extends React.Component {
    render() {
        return (
            <div className="greet">
                <h1 id={"refresh"} onClick={this.props.forceRefresh}><u>Hello, Daydash!</u></h1>
            </div>
        );
    }
}

module.exports = GreetingView;