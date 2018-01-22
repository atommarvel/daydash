const CalendarEventView = require('./CalendarEventView.js');

class CalendarList extends React.Component {
    render() {
        const events = this.props.events.map((event, i) => {
            return <CalendarEventView key={`cev${i}`} event={event}/>
        });
        return (
            <div className="cal">
                <div>Calendar ({this.props.events.length})</div>
                {events}
            </div>
        )
    }
}

module.exports = CalendarList;