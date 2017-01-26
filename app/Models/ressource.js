"use strict";
var Ressource = (function () {
    function Ressource() {
        this.id = 0;
        this.name = "";
        this.description = "";
        this.imgUrl = "./imgs/meetingraum.png";
        this.isRoom = false;
        this.hasSpecificSeats = false;
        this.blueprintUrl = "./imgs/blueprint.png";
        this.data = [];
    }
    return Ressource;
}());
exports.Ressource = Ressource;
//# sourceMappingURL=ressource.js.map