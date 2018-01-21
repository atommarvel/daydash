class CalendarList extends React.Component {
    render() {
        // TODO: render each item in it's own component (and add url parsing in there)
        const events = this.props.events.map((event, i) => {
            return <div key={`li${i}`}>{event.summary}</div>
        });
        return (
            <div className="cal">
                <div>Calendar</div>
                {events}
            </div>
        )
    }
}

module.exports = CalendarList;