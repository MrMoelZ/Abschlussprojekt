import {Injectable,EventEmitter,OnInit} from '@angular/core';
import {Booking} from '../Models/booking';
import {Moment} from 'moment/moment';
import {Ressource} from '../Models/ressource';
import {ApiService} from './api.service';
declare var moment: any;

@Injectable()
export class AvailabilityService {

    constructor(private apiService:ApiService) {
        this.Init();
    }

    bookingsUpdated = new EventEmitter();
    occupied:Array<Booking> = [];

    Init() {
        this.apiService.Get('/Entity.RessourcePlanner.Booking').subscribe(res => {
            for(let el of res.Value) {
                this.occupied.push({
                    Start:moment(el.Start),
                    End:moment(el.End),
                    Persons:el.Persons,
                    IsWholeRoom:el.IsWholeRoom,
                    RessourceId:el.RessourceId
                });
            }
            this.bookingsUpdated.emit();
        });
    }    

    public postBooking(booking:Booking) :boolean {
        this.apiService.Post('/Entity.RessourcePlanner.Booking',JSON.stringify(booking))
            .subscribe(res=>{
                if(res.Meta.IsValid && res.Meta.HttpStatusCode==200) {
                    this.occupied.push(booking);
                    this.bookingsUpdated.emit(booking);
                    return true;
                }
                else {
                    return false;
                }
            });
        return false;
    }

    public getAvailability(startdate:Moment, enddate:Moment, ressource:Ressource):boolean {
        let occ = this.occupied.filter(e=>e.RessourceId == ressource.id);
        for (let b of occ) {
            if(startdate.isBetween(b.Start,b.End)) {
                return false;
            }
            if (enddate.isBetween(b.Start,b.End)) {
                return false;
            }
            if (b.Start.isBetween(startdate,enddate)) {
                return false;
            }
            if (b.End.isBetween(startdate,enddate)) {
                return false;
            }
        }
        return true;
    }
}