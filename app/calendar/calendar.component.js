"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var day_1 = require('../Models/day');
var config_1 = require('../Config/config');
var availability_service_1 = require('../services/availability.service');
var CalendarComponent = (function () {
    function CalendarComponent(availabilityService) {
        this.availabilityService = availabilityService;
        // Properties
        this.week = [];
        this.occupiedHours = null;
        this.hours = [];
        this.occupied = null;
        this.day = [];
        this.selected = new core_1.EventEmitter();
    }
    //
    // Methods
    CalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        moment.updateLocale('de', { weekdaysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"] });
        this.hours = config_1.Config.getHours().filter(function (e) { return e.minutes() == 0; });
        this.today = moment();
        this.startOfToday = moment().startOf('day');
        this.current = moment(this.today);
        this.buildWeek(this.today);
        this.buildOccupied();
        this.availabilityService.bookingsUpdated.subscribe(function (booking) {
            _this.buildOccupied();
        });
    };
    // Build Methods
    CalendarComponent.prototype.buildOccupied = function () {
        if (!this.occupied)
            this.occupied = this.availabilityService.occupied;
        var _loop_1 = function(i) {
            if (i.RessourceId == this_1.ressource.id) {
                if (i.Start.isBefore(this_1.week[0].date) || i.End.isAfter(this_1.week[6].date))
                    return "continue";
                var start = moment(i.Start);
                var t1_1;
                var t2 = void 0;
                var days = [];
                // if end is the same day as start
                if (moment(i.Start).endOf('day').isSame(moment(i.End).endOf('day'))) {
                    days.push(this_1.week.find(function (e) { return e.date.isSame(i.Start, 'day'); }));
                }
                else if (moment(i.Start).endOf('day').add(1, 'days').isSame(moment(i.End).endOf('day'))) {
                    days.push(this_1.week.find(function (e) { return e.date.isSame(i.Start, 'day'); }));
                    days.push(this_1.week.find(function (e) { return e.date.isSame(i.End, 'day'); }));
                }
                else {
                    var _loop_2 = function(x) {
                        days.push(this_1.week.find(function (e) { return e.date.isSame(x, 'day'); }));
                    };
                    for (var x = moment(i.Start).startOf('day'); x.isBefore(moment(i.End).startOf('day')); x.add(1, 'days')) {
                        _loop_2(x);
                    }
                    days.push(this_1.week.find(function (e) { return e.date.isSame(i.End, 'day'); }));
                }
                //whole hours
                if (i.Start.minutes() == 0) {
                    t1_1 = moment(i.Start);
                }
                else {
                    t1_1 = moment(i.Start).endOf('hour');
                }
                if (i.End.minutes() == 0) {
                    t2 = moment(i.End);
                }
                else {
                    t2 = moment(i.End).startOf('hour');
                }
                for (t1_1; t1_1.isBefore(t2); t1_1.add(1, 'hour')) {
                    var day = days.find(function (e) { return e.date.isSame(t1_1, 'day'); });
                    if (day) {
                        if (!day.occupied.find(function (e) { return e === i; })) {
                            day.occupied.push(i);
                        }
                        // add ticks
                        var _loop_3 = function(j) {
                            if (day.occupiedTicks.find(function (e) { return e.isSame(j, 'minute'); }) == undefined) {
                                day.occupiedTicks.push(moment(j));
                            }
                        };
                        for (var j = moment(i.Start); j.isBefore(moment(i.End)); j.add(15, 'minutes')) {
                            _loop_3(j);
                        }
                    }
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.occupied; _i < _a.length; _i++) {
            var i = _a[_i];
            _loop_1(i);
        }
    };
    CalendarComponent.prototype.buildWeek = function (date) {
        this.week = [];
        var startOfWeek = moment(date).startOf('isoweek');
        var endOfWeek = moment(date).endOf('isoweek');
        for (var i = 0; i < 7; i++) {
            var d = moment(startOfWeek).add(i, 'days');
            this.week.push(new day_1.Day(d, this.hours));
        }
    };
    //
    // Control Methods
    CalendarComponent.prototype.click = function (i) {
        this.buildWeek(this.current.add(i, 'week'));
        this.buildOccupied();
    };
    CalendarComponent.prototype.select = function (h, m, d) {
        // if selected date is over 1 day before NOW dont accept it
        if (!d.isBefore(moment(this.startOfToday).subtract(1, 'day'))) {
            this.selected.emit({ hour: h, minute: m, ressource: this.ressource, day: d });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "ressource", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "selected", void 0);
    CalendarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'calendar',
            templateUrl: 'calendar.component.html',
            styleUrls: ['calendar.component.css']
        }), 
        __metadata('design:paramtypes', [availability_service_1.AvailabilityService])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map