import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {routing,appRoutingProviders} from './app.routing';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from "./app.component";
import {RessourceComponent} from './ressource/ressource.component';
import {ConfigurationComponent} from './configuration/configuration.component';
import {CalendarComponent} from './calendar/calendar.component';
import {BookingComponent} from './booking/booking.component';
import {AvailabilityService} from './services/availability.service';
import {ApiService} from './services/api.service';
import {AuthService} from './services/auth.service';
import {RessourceService} from './services/ressource.service';

@NgModule ({
    imports: [BrowserModule,routing,FormsModule,HttpModule],
    declarations:[AppComponent,RessourceComponent,ConfigurationComponent,CalendarComponent,BookingComponent],
    providers: [appRoutingProviders,AvailabilityService,ApiService,RessourceService,AuthService],
    bootstrap: [AppComponent]
    
})
export class AppModule {}