export class Ressource {
    id:number;
    name:string;
    description:string;
    imgUrl:string;
    isRoom:boolean;
    hasSpecificSeats:boolean;
    blueprintUrl:string;
    data:Array<string>;

    constructor() {
        this.id=0;
        this.name="";
        this.description="";
        this.imgUrl="./imgs/meetingraum.png";
        this.isRoom=false;
        this.hasSpecificSeats=false;
        this.blueprintUrl = "./imgs/blueprint.png";
        this.data = [];
    }
}