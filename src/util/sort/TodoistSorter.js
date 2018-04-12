const moment = require('moment');
const ItemDayOrganizer = require('./ItemDayOrganizer.js');

class TodoistSorter extends ItemDayOrganizer {

    sortDayArr(arr) {
        return arr.map(this.sortByDayOrder);
    }

    sortByDayOrder(arr) {
        function compare(a, b) {
            if (a.day_order < b.day_order) {
                return -1;
            }
            if (a.day_order > b.day_order) {
                return 1;
            }
            return 0;
        }

        return arr.sort(compare);
    }

    doesItemContainDate(item) {
        return item.due_date_utc;
    }

    getItemMoment(item) {
        return moment.utc(item.due_date_utc);
    }
}

module.exports = TodoistSorter;