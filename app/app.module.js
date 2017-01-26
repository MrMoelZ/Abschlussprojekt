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
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_1 = require('./app.routing');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require("./app.component");
var ressource_component_1 = require('./ressource/ressource.component');
var configuration_component_1 = require('./configuration/configuration.component');
var calendar_component_1 = require('./calendar/calendar.component');
var booking_component_1 = require('./booking/booking.component');
var availability_service_1 = require('./services/availability.service');
var api_service_1 = require('./services/api.service');
var auth_service_1 = require('./services/auth.service');
var ressource_service_1 = require('./services/ressource.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, app_routing_1.routing, forms_1.FormsModule, http_1.HttpModule],
            declarations: [app_component_1.AppComponent, ressource_component_1.RessourceComponent, configuration_component_1.ConfigurationComponent, calendar_component_1.CalendarComponent, booking_component_1.BookingComponent],
            providers: [app_routing_1.appRoutingProviders, availability_service_1.AvailabilityService, api_service_1.ApiService, ressource_service_1.RessourceService, auth_service_1.AuthService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map