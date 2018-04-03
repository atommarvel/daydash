const TextboxOption = require('./TextboxOption.js');
const CalendarOption = require('./CalendarOption.js');

class OptionItem extends React.Component {

    render() {
        let result;
        switch (this.props.data.type) {
            case "textboxOption":
                result = this.renderTextboxOption();
                break;
            case "calendarOption":
                result = this.renderCalendarOption();
                break;
        }
        return result;
    }

    renderTextboxOption() {
        return <TextboxOption data={this.props.data} changeListener={this.props.changeListener} storageKey={this.props.storageKey}/>
    }

    renderCalendarOption() {
        return <CalendarOption title={this.props.data.title}
                               value={this.props.data.value.split(',')}
                               changeListener={this.props.changeListener}
                               storageKey={this.props.storageKey}/>
    }
}

module.exports = OptionItem;