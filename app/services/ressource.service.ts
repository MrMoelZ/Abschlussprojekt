import { Injectable } from '@angular/core';

import { ApiService } from '../services/api.service';
import { Ressource } from '../Models/ressource';

@Injectable()
export class RessourceService {
    constructor(private apiService: ApiService) {
        this.Init();
    }

    ressources: Array<Ressource> = [];

    Init() {
        this.getRessources();
    }

    getRessources() {
        this.ressources = [];
        this.apiService.Get('/Entity.RessourcePlanner.Ressource')
            .subscribe(res => {
                for (let r of res.Value) {
                    this.ressources.push({
                        id: r.RessourceId,
                        description: r.Description,
                        name: r.Name,
                        data: r.Data,
                        imgUrl: r.ImgUrl,
                        blueprintUrl: r.BlueprintUrl,
                        hasSpecificSeats: r.HasSpecificSeats,
                        isRoom: r.IsRoom
                    })
                }
            });
    }

    postRessource(ressource: Ressource) {
        ressource.id = this.getId()+1;
        let r = {
            RessourceId: ressource.id,
            Description: ressource.description,
            Name: ressource.name,
            Data: ressource.data,
            ImgUrl: ressource.imgUrl,
            BlueprintUrl: ressource.blueprintUrl,
            HasSpecificSeats: ressource.hasSpecificSeats,
            IsRoom: ressource.isRoom
        } 

        this.apiService.Post('/Entity.RessourcePlanner.Ressource', JSON.stringify(r))
            .subscribe(res => {
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
    }

    getId() {
        let ids=[];
        this.ressources.forEach(e=>ids.push(e.id));
        return Math.max(...ids);
    }

}