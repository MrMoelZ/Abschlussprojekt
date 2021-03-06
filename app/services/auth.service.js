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
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.isAuthenticated = new core_1.EventEmitter();
        this.user = "";
    }
    AuthService.prototype.authenticate = function (username, password) {
        var _this = this;
        if (this.user == username) {
            this.isAuthenticated.emit(username);
        }
        else {
            var headers = new http_1.Headers();
            headers.append("access_token", "Gax7eHqIQ0qbSOFfSNkgEw==");
            var ret = this.http.
                post(config_1.Config.BaseUrl + '/v1/auth/login', { Login: username, Password: password }, { headers: headers })
                .map(function (res) { return res.json(); })
                .catch(function (res) { return Rx_1.Observable.throw(res.Meta.json().Message); });
            ret.subscribe(function (res) {
                if (res.Value && res.Value.access_token != null) {
                    _this.user = username;
                    _this.isAuthenticated.emit(username);
                }
            });
        }
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map