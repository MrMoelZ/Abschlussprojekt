import {Moment} from 'moment/moment';
import {Booking} from './booking';
declare var moment;

export class Day {
    date:Moment;
    occupied: Array<Booking>;
    occupiedTicks: Array<Moment>;
    hours: Array<Hour>;

    constructor(d:Moment, hours:Array<Moment>) {
        this.date=d;
        this.occupied = [];
        this.occupiedTicks = [];
        this.buildHours(hours);
    }

    getOccupied (t:Moment):boolean {
        return this.occupiedTicks.find(e=> t.isSame(e,'minute')) != undefined;
    }

    getPersons(h:number,m:number) {
        let tick = Tick.getTick(this.date,h,m);
        let item = this.occupied.find(e => tick.isBetween(e.Start,e.End,null,'[]'));
        if (item) {
            if (item.IsWholeRoom) {
                return -1;
            }
            else {
                return item.Persons;
            }
        }
        else return 0;
    }

    buildHours (hours:Array<Moment>) {
        this.hours = [];
        for (let x:number = 0;x<hours.length;x++) {
            this.hours.push(new Hour(hours[x].hour(),moment(this.date)));
        }
    }
}

class Tick {

static getTick(day:Moment,h:number,m:number) {
        return moment(day).set({'hour':h,'minute':m});
    }
}

export class Hour {
    hour: number;
    ticks: Array<Moment>;

    constructor(h:number,day:Moment) {
        this.hour = h;
        this.ticks =[];
        for(let i=0;i<60;i+=15) {
            this.ticks.push(moment(day).set({'hours':h,'minutes':i}));
        }
    }
}