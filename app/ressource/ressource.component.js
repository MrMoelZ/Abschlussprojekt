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
var ressource_service_1 = require('../services/ressource.service');
var auth_service_1 = require('../services/auth.service');
var RessourceComponent = (function () {
    //
    function RessourceComponent(ressourceService, authService) {
        this.ressourceService = ressourceService;
        this.authService = authService;
        // Properties
        this.ressources = [];
        this.authenticated = false;
        this.ressources = this.ressourceService.ressources;
    }
    // Methods
    RessourceComponent.prototype.getShowBooking = function (id) {
        return this.showBookingId == id;
    };
    RessourceComponent.prototype.handleSelected = function (e) {
        this.start = moment(e.day);
        this.start.set({ 'minute': e.minute, 'hour': e.hour });
        this.end = moment(e.day);
        this.end.set('hour', e.hour + 1);
        this.selectedRessource = e.ressource;
        this.showBookingId = e.ressource.id;
    };
    RessourceComponent.prototype.authenticate = function () {
        this.authService.authenticate(this.username, this.pw);
    };
    RessourceComponent.prototype.scrollTo = function (id) {
        window.location.hash = 'booking_' + id;
    };
    RessourceComponent.prototype.handleHide = function () {
        this.showBookingId = -1;
    };
    RessourceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.isAuthenticated.subscribe(function (e) {
            _this.username = e;
            _this.authenticated = true;
        });
        this.authenticated = this.authService.user != "";
        this.ressources = this.ressourceService.ressources;
    };
    RessourceComponent = __decorate([
        core_1.Component({
            selector: 'ressource',
            moduleId: module.id,
            templateUrl: './ressource.component.html',
            styleUrls: ['./ressource.component.css']
        }), 
        __metadata('design:paramtypes', [ressource_service_1.RessourceService, auth_service_1.AuthService])
    ], RessourceComponent);
    return RessourceComponent;
}());
exports.RessourceComponent = RessourceComponent;
//# sourceMappingURL=ressource.component.js.map