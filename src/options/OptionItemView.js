const TextboxOptionView = require('./TextboxOptionView.js');
const CalendarOptionList = require('./CalendarOptionList.js');

/**
 * Wrapper class that will render either a TextboxOptionView or CalendarOptionView.
 * Props:
 *      data: a map containing data associated to the OptionView that is intended to be rendered
 *      changeListener: callback triggered when the option is modified
 *      storageKey: the key used to store the OptionView data
 */

class OptionItemView extends React.Component {

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
        return <TextboxOptionView data={this.props.data}
                                  changeListener={this.props.changeListener}
                                  storageKey={this.props.storageKey}/>
    }

    renderCalendarOption() {
        return <CalendarOptionList title={this.props.data.title}
                               value={this.props.data.value.split(',')}
                               changeListener={this.props.changeListener}
                               storageKey={this.props.storageKey}/>
    }
}

module.exports = OptionItemView;