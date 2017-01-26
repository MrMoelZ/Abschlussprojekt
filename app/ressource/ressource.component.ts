import {Component, Input} from '@angular/core';
import {NgFor,NgIf} from '@angular/common';

import {Ressource} from '../Models/ressource';
import {CalendarComponent} from '../calendar/calendar.component';
import {BookingComponent} from '../booking/booking.component';
import {RessourceService} from '../services/ressource.service';
import {AuthService} from '../services/auth.service';
import {Moment} from 'moment/moment';
declare var moment;

@Component({
    selector: 'ressource',
    moduleId : module.id,
    templateUrl : './ressource.component.html',
    styleUrls: ['./ressource.component.css']
})
export class RessourceComponent {

    // Properties
    ressources : Array<Ressource> = [];
    selectedRessource:Ressource;
    start:Moment;
    end:Moment;
    showBookingId:number;
    username:string;
    pw:string;
    authenticated:boolean = false;
    //

    constructor(private ressourceService:RessourceService, private authService : AuthService) {
        this.ressources = this.ressourceService.ressources;
    }

    // Methods
    getShowBooking(id:number) {
        return this.showBookingId == id;
    }

    handleSelected(e) {
        this.start = moment(e.day);
        this.start.set({'minute':e.minute,'hour':e.hour});
        this.end = moment(e.day);
        this.end.set('hour',e.hour+1);
        this.selectedRessource = e.ressource;
        this.showBookingId = e.ressource.id;
    }

    authenticate() {
        this.authService.authenticate(this.username,this.pw);
    }

    scrollTo(id:number) {
        window.location.hash='booking_'+id;
    }

    handleHide () {
         this.showBookingId = -1;
    }

    ngOnInit() {
        this.authService.isAuthenticated.subscribe(e=>{
            this.username = e;
            this.authenticated = true;
        });
        this.authenticated = this.authService.user!="";
        this.ressources = this.ressourceService.ressources;
    }
    //
}