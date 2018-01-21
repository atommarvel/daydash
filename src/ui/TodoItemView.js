class TodoItemView extends React.Component {
    render() {
        return <div>{this.props.todo.content}</div>
    }
}

module.exports = TodoItemView;