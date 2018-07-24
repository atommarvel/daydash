const GCalClient = require('../data/GCalClient.js');
const gCalClient = new GCalClient();

/**
 * Displays a list of checkboxes with calendar names.
 * Props:
 *      title: option label
 *      value: list of currently checked calendars
 *      changeListener: callback triggered when a cal is checked or unchecked
 *      storageKey: the key used to store this option's data
 * State:
 *      cals: array of all the user's calendars
 */

class CalendarOptionList extends React.Component {

    constructor(props) {
        super(props);
        this.state ={cals: []};
        this.bindFuncs();
    }

    bindFuncs() {
        this.toggleCheck = this.toggleCheck.bind(this);
        this.renderCalendarItem = this.renderCalendarItem.bind(this);
    }

    render() {
        return (
            <div className={"optionItem"}>
                <div><label>{this.props.title}</label></div>
                {this.renderCalendarItems()}
            </div>
        );
    }

    renderCalendarItems() {
        let result;
        if (this.state.cals.length > 0) {
            result = (
                <div id={"calendarList"}>
                    {this.state.cals.map(this.renderCalendarItem)}
                </div>);
        } else {
            result = (<div>No Calendars Loaded</div>);
        }
        return result;
    }

    renderCalendarItem(cal) {
        const toggleState = this.isCalChecked(cal.id);
        return (
            <div key={cal.id} className={"calItem"}>
                <input type="checkbox" onChange={this.toggleCheck} data-cal-id={cal.id} checked={toggleState}/>
                {cal.summary}
            </div>
        );
    }

    isCalChecked(calId) {
        return this.props.value.indexOf(calId) > -1;
    }

    toggleCheck(event) {
        const isChecked = event.target.checked;
        const calId = event.target.getAttribute("data-cal-id");
        const checkedCals = this.props.value;
        if (isChecked) {
            checkedCals.push(calId);
        } else {
            const index = checkedCals.indexOf(calId);
            if (index > -1) {
                checkedCals.splice(index,1);
            }
        }
        this.props.changeListener(this.props.storageKey, checkedCals.join(','));
    }

    async componentDidMount() {
        const cals = await gCalClient.fetchAllCalendars();
        this.setState({cals: cals});
    }
}

module.exports = CalendarOptionList;