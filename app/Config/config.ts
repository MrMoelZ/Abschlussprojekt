import {Moment} from 'moment/moment';
import {Headers} from '@angular/http';
declare var moment;

export class Config{

    public static BaseUrl:string = "https://api.tocc.dirs21.de";
    public static Headers: Headers = new Headers();
    public static OfficeHoursStart: Moment = moment("6:00","HH:mm");
    public static OfficeHoursEnd: Moment = moment("20:00","HH:mm");

    public static getHours():Array<Moment> {
        let officeHours:Array<Moment> = [];
        let s = Config.OfficeHoursStart;
        let e = Config.OfficeHoursEnd;
        for(let x:Moment = moment(s);x.isBefore(e);x.add(15,'minutes')) {
            officeHours.push(moment(x));
        }
        return officeHours;
    }
}



// "start_live": "require('fs').rename(__dirname+'/app/Config/config.ts',__dirname+'/app/Config/config_orig.ts') && require('fs').rename(__dirname+'/app/Config/configLive.ts',__dirname+'/app/Config/config.ts') && npm run lite",
// "test": "3+3",


 