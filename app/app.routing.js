"use strict";
var router_1 = require('@angular/router');
var ressource_component_1 = require('./ressource/ressource.component');
var calendar_component_1 = require('./calendar/calendar.component');
var configuration_component_1 = require('./configuration/configuration.component');
var appRoutes = [
    {
        path: 'ressource',
        component: ressource_component_1.RessourceComponent
    },
    {
        path: '',
        component: ressource_component_1.RessourceComponent
    },
    {
        path: 'calendar',
        component: calendar_component_1.CalendarComponent
    },
    {
        path: 'configuration',
        component: configuration_component_1.ConfigurationComponent
    }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map