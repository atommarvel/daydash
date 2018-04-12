const GCalClient = require('../data/GCalClient.js');
const gCalClient = new GCalClient();

class CalendarOptionList extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state ={cals: []};
        this.bindFuncs();
    }

    bindFuncs() {
        this.toggleCheck = this.toggleCheck.bind(this);
        this.renderCalendarItem = this.renderCalendarItem.bind(this);
    }

    render() {
        const items = this.state.cals.length > 0 ? this.state.cals.map(this.renderCalendarItem) : (<div>No Calendars Loaded</div>);
        return (
            <div className={"optionItem"}>
                <div><label>{this.props.title}</label></div>
                <div id={"calendarList"}>
                    {items}
                </div>
            </div>
        );
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
        const checked = this.props.value;
        if (isChecked) {
            checked.push(calId);
        } else {
            const index = checked.indexOf(calId);
            if (index > -1) {
                checked.splice(index,1);
            }
        }
        console.log(checked);
        this.props.changeListener(this.props.storageKey, checked.join(','));
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const cals = await gCalClient.fetchAllCalendars();
        this.setState({
            cals: cals
        });
    }
}

module.exports = CalendarOptionList;