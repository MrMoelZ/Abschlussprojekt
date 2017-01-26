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
var ressource_1 = require('../Models/ressource');
var config_1 = require('../Config/config');
var ConfigurationComponent = (function () {
    function ConfigurationComponent(ressourceService) {
        this.ressourceService = ressourceService;
        //Properties
        this.options = [
            { text: "Geschäftszeiten einstellen", id: "time", show: false, icon: "schedule" },
            { text: "Ressourcen bearbeiten", id: "res_mod", show: false, icon: "edit" },
            { text: "Neue Ressource erstellen", id: "res", show: false, icon: "library_add" }
        ];
        this.ressource = new ressource_1.Ressource();
        this.officeHoursStart = 0;
        this.officeHoursEnd = 24;
        this.hours = [];
        this.modifyHidden = true;
        this.showAddData = false;
    }
    //
    // Methods
    ConfigurationComponent.prototype.ngOnInit = function () {
        this.ressourceService.getRessources();
        this.officeHoursStart = config_1.Config.OfficeHoursStart.hour();
        this.officeHoursEnd = config_1.Config.OfficeHoursEnd.hour();
        this.ressources = this.ressourceService.ressources;
        for (var x = 0; x < 24; x++) {
            this.hours.push(x);
            // this.hours.push(x+0.25);
            this.hours.push(x + 0.5);
        }
    };
    ConfigurationComponent.prototype.modifiyRes = function (res) {
        var r = this.ressources.find(function (e) { return e.name == res; });
        if (r) {
            this.modifyHidden = false;
            this.resToModify = r;
        }
    };
    ConfigurationComponent.prototype.showOption = function (o) {
        var i = this.options.find(function (e) { return e.id == o; });
        i.show = true;
    };
    ConfigurationComponent.prototype.hideOption = function (o) {
        var i = this.options.find(function (e) { return e.id == o.id; });
        if (o.id == "res") {
            this.ressource = new ressource_1.Ressource();
        }
        i.show = false;
    };
    ConfigurationComponent.prototype.getShow = function (o) {
        var i = this.options.find(function (e) { return e.id == o; });
        return i.show;
    };
    ConfigurationComponent.prototype.addData = function (data) {
        if (!this.ressource.data)
            this.ressource.data = [];
        this.ressource.data.push(data.value);
        this.showAddData = false;
        data.value = "";
    };
    ConfigurationComponent.prototype.removeData = function (data) {
        this.ressource.data.splice(this.ressource.data.indexOf(data), 1);
    };
    ConfigurationComponent.prototype.onOfficeTimes = function () {
        config_1.Config.OfficeHoursStart.set('hours', this.officeHoursStart);
        config_1.Config.OfficeHoursEnd.set('hours', this.officeHoursEnd);
        this.hideOption({ id: 'time' });
    };
    ConfigurationComponent.prototype.onSubmit = function () {
        this.ressourceService.postRessource(this.ressource);
        this.hideOption({ id: 'res' });
    };
    ConfigurationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'configuration',
            templateUrl: './configuration.component.html',
            styleUrls: ['./configuration.component.css']
        }), 
        __metadata('design:paramtypes', [ressource_service_1.RessourceService])
    ], ConfigurationComponent);
    return ConfigurationComponent;
}());
exports.ConfigurationComponent = ConfigurationComponent;
var Options = (function () {
    function Options() {
    }
    return Options;
}());
//# sourceMappingURL=configuration.component.js.map