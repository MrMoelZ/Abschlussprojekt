import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Booking } from '../Models/booking';
import { Ressource } from '../Models/ressource';
import { Moment } from 'moment/moment';
import { AvailabilityService } from '../services/availability.service';
declare var moment: any;

@Component({
    moduleId: module.id,
    selector: 'booking',
    templateUrl: 'booking.component.html',
    styleUrls: ['booking.component.css']
})
export class BookingComponent {

    constructor(private availabilityService: AvailabilityService) { }

    // Properties
    persons: number = 0;
    wholeRoom: boolean = true;
    booking: Booking = null;
    infomsg: String = "";
    errormsg: String = "";
    showInfo: boolean = false;
    showError: boolean = false;
    flash: boolean = false;
    // In/Output
    @Input() ressource: Ressource;
    @Input() start: Moment;
    @Input() end: Moment;
    @Output() hide = new EventEmitter();
    //


    // getter/setter
    get StartDate() {
        if (this.start) return this.start.format('DD.MM.YY');
        else return moment().format('DD.MM.YY');
    }

    get EndDate() {
        if (this.end) return this.end.format('DD.MM.YY');
        else return moment().format('DD.MM.YY');
    }

    get Start() {
        if (this.start) return this.start.format('HH:mm');
        else return moment().format('HH:mm');
    }

    get End() {
        if (this.end) return this.end.format('HH:mm');
        else return moment().format('HH:mm');
    }

    set sEnd(val: Moment) {
        this.validateInput(val, 'end');
        this.end = val;
    }

    set sStart(val: Moment) {
        this.validateInput(val, 'start');
        this.start = val;
    }

    get sEnd() {
        return this.end;
    }

    get sStart() {
        return this.start;
    }
    //

    // Methods
    ngOnInit() {
        this.flash = true;
    }

    ngOnChanges() {
        this.flash = true;
    }

    onSubmit() {
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
            this.errormsg ="Buchung nicht möglich!";
        }
    }


    onCancel() {
        window.location.hash = '#';
        this.flash = false;
        this.hide.emit();
    }
    //

    editHour(e) {
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
    }

    validateKBInput(e) {
        if (e.value.match(new RegExp(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/))) {
            let time = moment(e.value, 'HH:mm');
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
    }

    validateInput(time: Moment, e) {
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
    }

    fixMinutes(time: Moment) {
        let min = time.minute();
        if (min != 0 && min != 15 && min != 30 && min != 45) {
            time.minute(0);
        }
    }
    //
}
