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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var config_1 = require('../config/config');
var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
        this.baseUrl = config_1.Config.BaseUrl + '/v1/data';
        this.headers = config_1.Config.Headers;
    }
    ApiService.prototype.Get = function (command, headers) {
        if (!headers)
            headers = this.headers;
        if (!headers.get("access_token"))
            headers.append("access_token", "Gax7eHqIQ0qbSOFfSNkgEw==");
        // headers.append("access_token","Gax7eHqIQ0qbSOFfSNkgEw==");
        console.log('in get', headers.get("access_token"));
        return this.http
            .get(this.baseUrl + command, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (res) { return Rx_1.Observable.throw(res.Meta.json().Message); });
    };
    ApiService.prototype.Post = function (command, data, headers) {
        if (!headers)
            headers = this.headers;
        //headers.append("access_token","Gax7eHqIQ0qbSOFfSNkgEw==");
        console.log('inpost', headers.getAll("access_token"));
        return this.http
            .post(this.baseUrl + command, data, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error); });
    };
    ApiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map