const TodoItemView = require('./TodoItemView.js');

class TodoList extends React.Component {
    render() {
        const todos = this.props.todos.map((todo, i) => {
            return <TodoItemView key={`tiv${i}`} todo={todo}/>
        });
        return (
            <div className="todo">
                {this.props.header}
                {todos}
            </div>
        )
    }
}

module.exports = TodoList;