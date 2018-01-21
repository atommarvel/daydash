const moment = require('moment');

class ItemDayOrganizer {
    constructor(items, isGCal) {
        this.items = items;
        this.isGCal = isGCal;
    }

    getOrganizedArr() {
        this.dayArr = [[],[],[],[],[],[],[]];
        this.items.forEach(item => {
            this.placeEventIntoDayArray(item);
        });
        this.sortDayArr();
        return this.dayArr;
    }

    sortDayArr() {
        if (this.isGCal) {
            this.dayArr = this.dayArr.map(this.sortByStartTime);
        } else {
            this.dayArr = this.dayArr.map(this.sortByDayOrder);
        }
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

    placeEventIntoDayArray(item) {
        const daysAhead = this.getDaysAhead(item);
        if (daysAhead === null) return;
        this.dayArr[daysAhead].push(item);
    }

    getDaysAhead(item) {
        if (!this.doesItemContainDate(item)) return null;
        const allowableDaysAhead = 6;
        let curDaysAhead = 0;
        for (curDaysAhead; curDaysAhead <= allowableDaysAhead; curDaysAhead++) {
            if (this.isEventInDay(item, curDaysAhead)) {
                return curDaysAhead;
            }
        }
        return null;
    }

    doesItemContainDate(item) {
        return (this.isGCal && item.start) || (item.due_date_utc);
    }

    isEventInDay(item, daysAhead) {
        let beginningOfDay = moment().startOf('day').add(daysAhead, 'd');
        let endOfDay = moment().endOf('day').add(daysAhead, 'd');
        let itemDate = this.getItemMoment(item);
        return itemDate.isBetween(beginningOfDay, endOfDay);
    }

    getItemMoment(item) {
        if (this.isGCal) {
            return moment(item.start.dateTime || item.start.date);
        } else {
            return moment.utc(item.due_date_utc);
        }
    }
}

module.exports = ItemDayOrganizer;