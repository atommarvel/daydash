const moment = require('moment');

class CalendarEventView extends React.Component {
    render() {
        const event = this.props.event;
        let timeOfEvent = "";
        if (event.start.dateTime) {
            const time = moment(event.start.dateTime);
            let format = "hA";
            if (time.minute() !== 0) {
                format = "h:mmA";
            }
            timeOfEvent = time.format(format);
        } else {
            timeOfEvent = "all day";
        }
        return <div>{timeOfEvent} - {event.summary}</div>
    }
}

module.exports = CalendarEventView;