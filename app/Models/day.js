"use strict";
var Day = (function () {
    function Day(d, hours) {
        this.date = d;
        this.occupied = [];
        this.occupiedTicks = [];
        this.buildHours(hours);
    }
    Day.prototype.getOccupied = function (t) {
        return this.occupiedTicks.find(function (e) { return t.isSame(e, 'minute'); }) != undefined;
    };
    Day.prototype.getPersons = function (h, m) {
        var tick = Tick.getTick(this.date, h, m);
        var item = this.occupied.find(function (e) { return tick.isBetween(e.Start, e.End, null, '[]'); });
        if (item) {
            if (item.IsWholeRoom) {
                return -1;
            }
            else {
                return item.Persons;
            }
        }
        else
            return 0;
    };
    Day.prototype.buildHours = function (hours) {
        this.hours = [];
        for (var x = 0; x < hours.length; x++) {
            this.hours.push(new Hour(hours[x].hour(), moment(this.date)));
        }
    };
    return Day;
}());
exports.Day = Day;
var Tick = (function () {
    function Tick() {
    }
    Tick.getTick = function (day, h, m) {
        return moment(day).set({ 'hour': h, 'minute': m });
    };
    return Tick;
}());
var Hour = (function () {
    function Hour(h, day) {
        this.hour = h;
        this.ticks = [];
        for (var i = 0; i < 60; i += 15) {
            this.ticks.push(moment(day).set({ 'hours': h, 'minutes': i }));
        }
    }
    return Hour;
}());
exports.Hour = Hour;
//# sourceMappingURL=day.js.map