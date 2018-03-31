class TextboxOption extends React.Component {

    constructor(props) {
        super(props);
        this.state = {todos: [], events: [], overdue: []};
        this.bindFuncs();
    }

    bindFuncs() {
        this.changeListener = this.changeListener.bind(this);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <div><label>{this.props.data.title}</label></div>
                <input id={this.props.storageKey} type="text" value={this.props.data.value} onChange={this.changeListener}/>
            </div>
        );
    }

    changeListener(event) {
        let data = this.props.data;
        data.value = event.target.value;
        this.props.changeListener(this.props.storageKey, data);
    }
}

module.exports = TextboxOption;