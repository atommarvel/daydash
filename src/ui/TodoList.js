class TodoList extends React.Component {
    render() {
        // TODO: render each item in it's own component (and add url parsing in there)
        const keys = Object.keys(this.props.todos);
        const todoLi = keys.map((key, i) => {
            const todo = this.props.todos[key];
            return <div key={`li${i}`}>{todo.content}</div>
        });
        return (
            <div className="todo">
                    {todoLi}
            </div>
        )
    }
}

module.exports = TodoList;