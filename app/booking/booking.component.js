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
var ressource_1 = require('../Models/ressource');
var availability_service_1 = require('../services/availability.service');
var BookingComponent = (function () {
    function BookingComponent(availabilityService) {
        this.availabilityService = availabilityService;
        // Properties
        this.persons = 0;
        this.wholeRoom = true;
        this.booking = null;
        this.infomsg = "";
        this.errormsg = "";
        this.showInfo = false;
        this.showError = false;
        this.flash = false;
        this.hide = new core_1.EventEmitter();
    }
    Object.defineProperty(BookingComponent.prototype, "StartDate", {
        //
        // getter/setter
        get: function () {
            if (this.start)
                return this.start.format('DD.MM.YY');
            else
                return moment().format('DD.MM.YY');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookingComponent.prototype, "EndDate", {
        get: function () {
            if (this.end)
                return this.end.format('DD.MM.YY');
            else
                return moment().format('DD.MM.YY');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookingComponent.prototype, "Start", {
        get: function () {
            if (this.start)
                return this.start.format('HH:mm');
            else
                return moment().format('HH:mm');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookingComponent.prototype, "End", {
        get: function () {
            if (this.end)
                return this.end.format('HH:mm');
            else
                return moment().format('HH:mm');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookingComponent.prototype, "sEnd", {
        get: function () {
            return this.end;
        },
        set: function (val) {
            this.validateInput(val, 'end');
            this.end = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookingComponent.prototype, "sStart", {
        get: function () {
            return this.start;
        },
        set: function (val) {
            this.validateInput(val, 'start');
            this.start = val;
        },
        enumerable: true,
        configurable: true
    });
    //
    // Methods
    BookingComponent.prototype.ngOnInit = function () {
        this.flash = true;
    };
    BookingComponent.prototype.ngOnChanges = function () {
        this.flash = true;
    };
    BookingComponent.prototype.onSubmit = function () {
        this.flash = false;
        // validate
        if (this.availabilityService.getAvailability(this.start, this.end, this.ressource)) {
            this.booking = {
                Start: this.start,
                End: this.end,
                Persons: this.wholeRoom ? -1 : this.persons,
                IsWholeRoom: this.wholeRoom,
                RessourceId: this.ressource.id
            };
            this.availabilityService.postBooking(this.booking);
            this.hide.emit();
        }
        else {
            this.showError = true;
            this.errormsg = "Buchung nicht möglich!";
        }
    };
    BookingComponent.prototype.onCancel = function () {
        window.location.hash = '#';
        this.flash = false;
        this.hide.emit();
    };
    //
    BookingComponent.prototype.editHour = function (e) {
        if (e.id.startsWith('start')) {
            if (e.id.endsWith('u')) {
                this.sStart = this.sStart.add(1, 'hour');
            }
            else if (e.id.endsWith('d')) {
                this.sStart = this.sStart.subtract(1, 'hour');
            }
        }
        if (e.id.startsWith('end')) {
            if (e.id.endsWith('u')) {
                this.sEnd = this.sEnd.add(1, 'hour');
            }
            else if (e.id.endsWith('d')) {
                this.sEnd = this.sEnd.subtract(1, 'hour');
            }
        }
    };
    BookingComponent.prototype.validateKBInput = function (e) {
        if (e.value.match(new RegExp(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/))) {
            var time = moment(e.value, 'HH:mm');
            if (e.name == 'start') {
                this.sStart = this.sStart.set({ 'hour': time.hour(), 'minute': time.minute() });
            }
            else {
                this.sEnd = this.sEnd.set({ 'hour': time.hour(), 'minute': time.minute() });
            }
        }
        else {
            console.log('invalid input', e.value);
        }
    };
    BookingComponent.prototype.validateInput = function (time, e) {
        if (e == 'start') {
            this.fixMinutes(time);
            if (this.end.isSameOrBefore(time)) {
                this.end.hours(time.hours() + 1);
            }
        }
        else {
            this.fixMinutes(time);
            if (time.isSameOrBefore(this.start)) {
                this.start.hours(time.hours() - 1);
            }
        }
    };
    BookingComponent.prototype.fixMinutes = function (time) {
        var min = time.minute();
        if (min != 0 && min != 15 && min != 30 && min != 45) {
            time.minute(0);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', ressource_1.Ressource)
    ], BookingComponent.prototype, "ressource", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BookingComponent.prototype, "start", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BookingComponent.prototype, "end", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BookingComponent.prototype, "hide", void 0);
    BookingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'booking',
            templateUrl: 'booking.component.html',
            styleUrls: ['booking.component.css']
        }), 
        __metadata('design:paramtypes', [availability_service_1.AvailabilityService])
    ], BookingComponent);
    return BookingComponent;
}());
exports.BookingComponent = BookingComponent;
//# sourceMappingURL=booking.component.js.map