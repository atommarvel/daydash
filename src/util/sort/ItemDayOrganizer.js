const moment = require('moment');

/**
 * Formats lists of items into an array of arrays based on which day in the future they fall into.
 */

/*abstract*/ class ItemDayOrganizer {
    constructor(items) {
        this.items = items;
    }

    /**
     * Abstract methods:
     *      sortDayArr(arr) -> arr
     *      doesItemContainDate(item) -> boolean
     *      getItemMoment(item) -> moment object
     */

    getOrganizedArr() {
        this.dayArr = [[],[],[],[],[],[],[]];
        this.items.forEach(item => {
            this.placeEventIntoDayArray(item);
        });
        this.dayArr = this.sortDayArr(this.dayArr);
        return this.dayArr;
    }

    getOlderItems() {
        const startOfToday = moment().startOf('day');
        return this.items.filter(item => moment.utc(item.due_date_utc).isBefore(startOfToday));
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

    isEventInDay(item, daysAhead) {
        let beginningOfDay = moment().startOf('day').add(daysAhead, 'd');
        let endOfDay = moment().endOf('day').add(daysAhead, 'd');
        let itemDate = this.getItemMoment(item);
        return itemDate.isBetween(beginningOfDay, endOfDay);
    }
}

module.exports = ItemDayOrganizer;