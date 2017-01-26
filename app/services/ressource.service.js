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
var api_service_1 = require('../services/api.service');
var RessourceService = (function () {
    function RessourceService(apiService) {
        this.apiService = apiService;
        this.ressources = [];
        this.Init();
    }
    RessourceService.prototype.Init = function () {
        this.getRessources();
    };
    RessourceService.prototype.getRessources = function () {
        var _this = this;
        this.ressources = [];
        this.apiService.Get('/Entity.RessourcePlanner.Ressource')
            .subscribe(function (res) {
            for (var _i = 0, _a = res.Value; _i < _a.length; _i++) {
                var r = _a[_i];
                _this.ressources.push({
                    id: r.RessourceId,
                    description: r.Description,
                    name: r.Name,
                    data: r.Data,
                    imgUrl: r.ImgUrl,
                    blueprintUrl: r.BlueprintUrl,
                    hasSpecificSeats: r.HasSpecificSeats,
                    isRoom: r.IsRoom
                });
            }
        });
    };
    RessourceService.prototype.postRessource = function (ressource) {
        ressource.id = this.getId() + 1;
        var r = {
            RessourceId: ressource.id,
            Description: ressource.description,
            Name: ressource.name,
            Data: ressource.data,
            ImgUrl: ressource.imgUrl,
            BlueprintUrl: ressource.blueprintUrl,
            HasSpecificSeats: ressource.hasSpecificSeats,
            IsRoom: ressource.isRoom
        };
        this.apiService.Post('/Entity.RessourcePlanner.Ressource', JSON.stringify(r))
            .subscribe(function (res) {
            if (res.Meta.IsValid && res.Meta.HttpStatusCode == 200) {
                //this.ressources.push(ressource);
                // console.log("bookingsupdatedemit, postBooking");
                // this.bookingsUpdated.emit(booking);
                return true;
            }
            else {
                return false;
            }
        });
    };
    RessourceService.prototype.getId = function () {
        var ids = [];
        this.ressources.forEach(function (e) { return ids.push(e.id); });
        return Math.max.apply(Math, ids);
    };
    RessourceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [api_service_1.ApiService])
    ], RessourceService);
    return RessourceService;
}());
exports.RessourceService = RessourceService;
//# sourceMappingURL=ressource.service.js.map