import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Config } from '../config/config';

@Injectable()
export class AuthService {

    constructor(private http: Http) { }

    isAuthenticated = new EventEmitter();
    user: string = "";

    authenticate(username: string, password: string) {
        if (this.user == username) {
            this.isAuthenticated.emit(username);
        }
            
        else {
            let ret = this.http.
                post(Config.BaseUrl+'/v1/auth/login', { Login: username, Password: password })
                .map(res => res.json())
                .catch(res => Observable.throw(res.Meta.json().Message));
            ret.subscribe(res => {
                if (res.Value && res.Value.access_token != null) {
                    this.user = username;
                    this.isAuthenticated.emit(username);
                }
            });
        }
    }
}