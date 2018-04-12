const moment = require('moment');
const ItemDayOrganizer = require('./ItemDayOrganizer.js');

class GCalSorter extends ItemDayOrganizer {

    sortDayArr(arr) {
        return arr.map(this.sortByStartTime);
    }

    sortByStartTime(arr) {
        function compare(a, b) {
            const timeA = moment(a.start.dateTime || a.start.date);
            const timeB = moment(b.start.dateTime || b.start.date);
            if (timeA.isBefore(timeB)) {
                return -1;
            }
            if (timeA.isAfter(timeB)) {
                return 1;
            }
            return 0;
        }

        return arr.sort(compare);
    }

    doesItemContainDate(item) {
        return item.start;
    }

    getItemMoment(item) {
        return moment(item.start.dateTime || item.start.date);
    }
}

module.exports = GCalSorter;