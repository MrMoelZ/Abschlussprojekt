import {Moment} from 'moment/moment';
declare var moment;

export class Config{

    public static BaseUrl:string = "http://api.tocc.dirs21.local";
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