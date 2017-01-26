import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Booking } from '../Models/booking';
import { Day } from '../Models/day';
import { Hour } from '../Models/day';
import { Config } from '../Config/config';
import { Moment } from 'moment/moment';
import { AvailabilityService } from '../services/availability.service';
declare var moment: any;

@Component({
    moduleId: module.id,
    selector: 'calendar',
    templateUrl: 'calendar.component.html',
    styleUrls: ['calendar.component.css']
})
export class CalendarComponent {
    constructor(private availabilityService: AvailabilityService) { }

    // Properties
    week: Array<Day> = [];
    current: Moment;
    today: Moment;
    startOfToday: Moment;
    occupiedHours: Array<any> = null;
    hours: Array<Moment> = [];
    occupied: Array<Booking> = null
    day: Array<Hour>=[];
    //

    // In/Output
    @Input() ressource;
    @Output() selected = new EventEmitter();
    //

    // Methods
    ngOnInit() {
        moment.updateLocale('de', { weekdaysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"] });
        this.hours = Config.getHours().filter(e => e.minutes() == 0);
        this.today = moment();
        this.startOfToday = moment().startOf('day');
        this.current = moment(this.today);
        this.buildWeek(this.today);
        this.buildOccupied();
        this.availabilityService.bookingsUpdated.subscribe(
            (booking) => {
                this.buildOccupied();
            }
        );
    }

    // Build Methods
    buildOccupied() {
        if (!this.occupied) this.occupied = this.availabilityService.occupied;
        for (let i of this.occupied) {
            if (i.RessourceId == this.ressource.id) {
                if (i.Start.isBefore(this.week[0].date) || i.End.isAfter(this.week[6].date)) continue;
                let start = moment(i.Start);
                let t1: Moment;
                let t2: Moment;
                let days: Array<Day> = [];
                // if end is the same day as start
                if (moment(i.Start).endOf('day').isSame(moment(i.End).endOf('day'))) {
                    days.push(this.week.find(e => e.date.isSame(i.Start, 'day')));
                }
                // if end is the next day
                else if (moment(i.Start).endOf('day').add(1,'days').isSame(moment(i.End).endOf('day'))) {
                    days.push(this.week.find(e => e.date.isSame(i.Start, 'day')));
                    days.push(this.week.find(e => e.date.isSame(i.End, 'day')));
                }
                // if end is more than 1 day after start
                else {
                    for (let x: Moment = moment(i.Start).startOf('day'); x.isBefore(moment(i.End).startOf('day')); x.add(1, 'days')) {
                        days.push(this.week.find(e => e.date.isSame(x, 'day')));
                    }
                    days.push(this.week.find(e => e.date.isSame(i.End, 'day')));
                }
                //whole hours
                if (i.Start.minutes() == 0) {
                    t1 = moment(i.Start);
                }
                else {
                    t1 = moment(i.Start).endOf('hour');
                }
                if (i.End.minutes() == 0) {
                    t2 = moment(i.End);
                }
                else {
                    t2 = moment(i.End).startOf('hour');
                }
                
                for (t1; t1.isBefore(t2); t1.add(1, 'hour')) {
                    let day = days.find(e => e.date.isSame(t1, 'day'));
                    if (day) {
                        if(!day.occupied.find(e=>e === i)) {
                            day.occupied.push(i);
                        }
                        // add ticks
                        for (let j: Moment = moment(i.Start); j.isBefore(moment(i.End)); j.add(15, 'minutes')) {
                            if (day.occupiedTicks.find(e => e.isSame(j, 'minute')) == undefined) {
                                day.occupiedTicks.push(moment(j));
                            }
                        }
                    }
                }
            }
        }
    }

    buildWeek(date: Moment): void {
        this.week = [];
        let startOfWeek = moment(date).startOf('isoweek');
        let endOfWeek = moment(date).endOf('isoweek');
        for (var i = 0; i < 7; i++) {
            let d = moment(startOfWeek).add(i, 'days');
            this.week.push(new Day(d,this.hours));
        }
    }
    //

    // Control Methods
    click(i: number) {
        this.buildWeek(this.current.add(i, 'week'));
        this.buildOccupied();
    }

    select(h: number,m:number, d: Moment) {
        // if selected date is over 1 day before NOW dont accept it
        if (!d.isBefore(moment(this.startOfToday).subtract(1, 'day'))) {
            this.selected.emit({ hour: h, minute:m, ressource: this.ressource, day: d });
        }
    }
    //
}

