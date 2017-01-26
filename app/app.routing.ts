import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import {RessourceComponent} from './ressource/ressource.component';
import {CalendarComponent} from './calendar/calendar.component';
import {ConfigurationComponent} from './configuration/configuration.component';
import {AppComponent} from './app.component';

const appRoutes : Routes = [
    {
        path:'ressource',
        component:RessourceComponent
    },
    {
        path:'',
        component:RessourceComponent
    },
    {
        path:'calendar',
        component:CalendarComponent
    },
    {
        path:'configuration',
        component:ConfigurationComponent
    }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);