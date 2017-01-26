import {Component,OnInit} from '@angular/core';
import {NgFor} from '@angular/common';
import {RessourceService} from '../services/ressource.service';
import {Ressource} from '../Models/ressource';
import {Moment} from 'moment/moment';
import {Config} from '../Config/config';


@Component({
    moduleId:module.id,
    selector:'configuration',
    templateUrl:'./configuration.component.html',
    styleUrls:['./configuration.component.css']
})
export class ConfigurationComponent {

    constructor(private ressourceService:RessourceService) {}

    //Properties
    options:Array<Options>= [
        {text:"Geschäftszeiten einstellen",id:"time",show:false,icon:"schedule"},
        {text:"Ressourcen bearbeiten",id:"res_mod",show:false,icon:"edit"},
        {text:"Neue Ressource erstellen",id:"res",show:false,icon:"library_add"}
    ];
    ressources:Array<Ressource>;
    ressource:Ressource = new Ressource();
    officeHoursStart: number = 0;
    officeHoursEnd: number = 24;
    hours: Array<number> = [];
    modifyHidden: boolean = true;
    resToModify: Ressource;
    showAddData:boolean=false;
    //

    // Methods
    ngOnInit() {
        this.ressourceService.getRessources();
        this.officeHoursStart =Config.OfficeHoursStart.hour();
        this.officeHoursEnd =Config.OfficeHoursEnd.hour();
        this.ressources = this.ressourceService.ressources;
        for (let x=0;x<24;x++) {
            this.hours.push(x);
            // this.hours.push(x+0.25);
            this.hours.push(x+0.5);
            //this.hours.push(x+0.75);
        }
    }
    
    modifiyRes(res:string) {
        let r = this.ressources.find(e=>e.name == res);
        if(r) {
            this.modifyHidden = false;
            this.resToModify = r;
        }
    }

    showOption(o) {
        let i = this.options.find(e=>e.id==o);
        i.show=true;
    }

    hideOption(o) {
        let i = this.options.find(e=>e.id==o.id);
        if(o.id=="res") {
            this.ressource = new Ressource();
        }
        i.show=false;
    }

    getShow(o) {
        let i = this.options.find(e=>e.id==o);
        return i.show;
    }

    addData(data) {
        if(!this.ressource.data) this.ressource.data = []; 
        this.ressource.data.push(data.value);
        this.showAddData=false;
        data.value = "";
    }

    removeData(data:string) {
        this.ressource.data.splice(this.ressource.data.indexOf(data),1);
    }

    onOfficeTimes() {
        Config.OfficeHoursStart.set('hours',this.officeHoursStart);
        Config.OfficeHoursEnd.set('hours',this.officeHoursEnd);
        this.hideOption({id:'time'});
    }

    onSubmit() {
        this.ressourceService.postRessource(this.ressource);
        this.hideOption({id:'res'});
    }
    //

}

class Options {
    text : string;
    id: string;
    show:boolean;
    icon:string;
}