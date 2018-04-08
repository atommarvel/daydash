const moment = require('moment');
const CalendarEventView = require('./CalendarEventView.js');
const CollapsibleContainer = require('./CollapsibleContainer.js');

class CalendarList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {shouldHideOld: true};
        this.bindFuncs();
    }

    bindFuncs() {
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    render() {
        const events = this.splitEventsBeforeAndAfterNow();
        const oldEvents = events.before.map((event, i) => {
            return <CalendarEventView key={`cev${i}`} event={event}/>
            });
        const futureEvents = events.after.map((event, i) => {
            return <CalendarEventView key={`cev${i}`} event={event}/>
        });
        return (
            <div className="cal">
                <div>Calendar ({futureEvents.length})</div>
                {this.renderOldEvents(oldEvents)}
                {futureEvents}
            </div>
        )
    }

    renderOldEvents(oldEvents) {
        let result;
        if (oldEvents.length > 0) {
            result =
            (<CollapsibleContainer isCollapsed={this.state.shouldHideOld} toggleCollapse={this.toggleCollapse}>
                {oldEvents}
            </CollapsibleContainer>);
        }
        return result;
    }

    toggleCollapse() {
        this.setState({shouldHideOld: !this.state.shouldHideOld})
    }

    splitEventsBeforeAndAfterNow() {
        const before = [];
        const after = [];
        const now = moment();
        this.props.events.forEach((event) => {
            let eventEnd = moment(event.end.dateTime);
            if (eventEnd.isBefore(now)) {
                before.push(event);
            } else {
                after.push(event);
            }
        });
        return {
            before: before,
            after: after
        };
    }
}

module.exports = CalendarList;