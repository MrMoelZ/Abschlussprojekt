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
var api_service_1 = require('./api.service');
var AvailabilityService = (function () {
    function AvailabilityService(apiService) {
        this.apiService = apiService;
        this.bookingsUpdated = new core_1.EventEmitter();
        this.occupied = [];
        this.Init();
    }
    AvailabilityService.prototype.Init = function () {
        var _this = this;
        this.apiService.Get('/Entity.RessourcePlanner.Booking').subscribe(function (res) {
            for (var _i = 0, _a = res.Value; _i < _a.length; _i++) {
                var el = _a[_i];
                _this.occupied.push({
                    Start: moment(el.Start),
                    End: moment(el.End),
                    Persons: el.Persons,
                    IsWholeRoom: el.IsWholeRoom,
                    RessourceId: el.RessourceId
                });
            }
            _this.bookingsUpdated.emit();
        });
    };
    AvailabilityService.prototype.postBooking = function (booking) {
        var _this = this;
        this.apiService.Post('/Entity.RessourcePlanner.Booking', JSON.stringify(booking))
            .subscribe(function (res) {
            if (res.Meta.IsValid && res.Meta.HttpStatusCode == 200) {
                _this.occupied.push(booking);
                _this.bookingsUpdated.emit(booking);
                return true;
            }
            else {
                return false;
            }
        });
        return false;
    };
    AvailabilityService.prototype.getAvailability = function (startdate, enddate, ressource) {
        var occ = this.occupied.filter(function (e) { return e.RessourceId == ressource.id; });
        for (var _i = 0, occ_1 = occ; _i < occ_1.length; _i++) {
            var b = occ_1[_i];
            if (startdate.isBetween(b.Start, b.End)) {
                return false;
            }
            if (enddate.isBetween(b.Start, b.End)) {
                return false;
            }
            if (b.Start.isBetween(startdate, enddate)) {
                return false;
            }
            if (b.End.isBetween(startdate, enddate)) {
                return false;
            }
        }
        return true;
    };
    AvailabilityService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [api_service_1.ApiService])
    ], AvailabilityService);
    return AvailabilityService;
}());
exports.AvailabilityService = AvailabilityService;
//# sourceMappingURL=availability.service.js.map