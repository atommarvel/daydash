/**
 * An OptionView that allows the user to access the options data via a textbox.
 */

class TextboxOptionView extends React.Component {

    constructor(props) {
        super(props);
        this.bindFuncs();
    }

    bindFuncs() {
        this.changeListener = this.changeListener.bind(this);
    }

    render() {
        return (
            <div className={"optionItem"}>
                <div><label>{this.props.data.title}</label></div>
                <input id={this.props.storageKey} type="text" value={this.props.data.value} onChange={this.changeListener}/>
            </div>
        );
    }

    changeListener(event) {
        this.props.changeListener(this.props.storageKey, event.target.value);
    }
}

module.exports = TextboxOptionView;