import {Injectable} from '@angular/core';
import {Http,RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Config} from '../config/config';

@Injectable()
export class ApiService {

    constructor(private http:Http) {}

    baseUrl:string = Config.BaseUrl+'/v1/data';
    options:RequestOptionsArgs;

    public Get (command:string) {
        return this.http
            .get(this.baseUrl+command)
            .map(res=>res.json())
            .catch(res=>Observable.throw(res.Meta.json().Message));
    }  

    public Post (command:string,data:any) {
        return this.http
            .post(this.baseUrl+command,data)
            .map(res=>res.json())
            .catch(error=>Observable.throw(error.json().error));
    }
}