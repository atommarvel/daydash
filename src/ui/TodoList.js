const TodoItemView = require('./TodoItemView.js');

class TodoList extends React.Component {
    render() {
        // TODO: render each item in it's own component (and add url parsing in there)
        const keys = Object.keys(this.props.todos);
        const todos = keys.map((key, i) => {
            const todo = this.props.todos[key];
            return <TodoItemView key={`tiv${i}`} todo={todo}/>
        });
        return (
            <div className="todo">
                <div>Todoist</div>
                    {todos}
            </div>
        )
    }
}

module.exports = TodoList;