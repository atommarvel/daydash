class TodoView extends React.Component {
    render() {
        const keys = Object.keys(this.props.todos);
        const todoLi = keys.map((key, i) => {
            const todo = this.props.todos[key];
            return <li key={`li${i}`}>{todo.content}</li>
        });
        return (
            <div className="todo">
                <ul>
                    {todoLi}
                </ul>
            </div>
        )
    }
}

module.exports = TodoView;