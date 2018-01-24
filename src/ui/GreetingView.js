const TodoList = require('./TodoList.js');

class GreetingView extends React.Component {
    render() {
        return (
            <div className="greet">
                <h1>Hello, Daydash!</h1>
            </div>
        );
    }
}

module.exports = GreetingView;