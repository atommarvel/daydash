const TextboxOption = require('./TextboxOption.js');

class OptionItem extends React.Component {

    render() {
        let result;
        switch (this.props.data.type) {
            case "textboxOption":
                result = this.renderTextboxOption();
                break;
            case "calendarOption":
                result = this.renderCalendarOption();
        }
        return result;
    }

    renderTextboxOption() {
        return <TextboxOption data={this.props.data} changeListener={this.props.optionChangeListener}/>
    }

    renderCalendarOption() {
        return <TextboxOption data={this.props.data} changeListener={this.props.optionChangeListener}/>
    }
}

module.exports = OptionItem;