import {Injectable} from '@angular/core';
import {Http,RequestOptionsArgs, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Config} from '../config/config';

@Injectable()
export class ApiService {

    constructor(private http:Http) {}

    baseUrl: string = Config.BaseUrl+'/v1/data';
    headers: Headers = Config.Headers;

    public Get (command: string, headers?: Headers) {
        if( !headers ) headers = this.headers;
        if( !headers.get("access_token")) headers.append("access_token","Gax7eHqIQ0qbSOFfSNkgEw==");
        // headers.append("access_token","Gax7eHqIQ0qbSOFfSNkgEw==");
        console.log('in get',headers.get("access_token"));
        return this.http
            .get(this.baseUrl+command, {headers:headers})
            .map(res=>res.json())
            .catch(res=>Observable.throw(res.Meta.json().Message));
    }  

    public Post (command:string, data:any, headers?: Headers) {
        if( !headers ) headers = this.headers;
        //headers.append("access_token","Gax7eHqIQ0qbSOFfSNkgEw==");
        console.log('inpost',headers.getAll("access_token"));
        return this.http
            .post(this.baseUrl+command, data, {headers:headers})
            .map(res=>res.json())
            .catch(error=>Observable.throw(error.json().error));
    }
}