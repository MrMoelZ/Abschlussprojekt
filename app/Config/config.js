"use strict";
var http_1 = require('@angular/http');
var Config = (function () {
    function Config() {
    }
    Config.getHours = function () {
        var officeHours = [];
        var s = Config.OfficeHoursStart;
        var e = Config.OfficeHoursEnd;
        for (var x = moment(s); x.isBefore(e); x.add(15, 'minutes')) {
            officeHours.push(moment(x));
        }
        return officeHours;
    };
    Config.BaseUrl = "https://api.tocc.dirs21.de";
    Config.Headers = new http_1.Headers();
    Config.OfficeHoursStart = moment("6:00", "HH:mm");
    Config.OfficeHoursEnd = moment("20:00", "HH:mm");
    return Config;
}());
exports.Config = Config;
// "start_live": "require('fs').rename(__dirname+'/app/Config/config.ts',__dirname+'/app/Config/config_orig.ts') && require('fs').rename(__dirname+'/app/Config/configLive.ts',__dirname+'/app/Config/config.ts') && npm run lite",
// "test": "3+3",
//# sourceMappingURL=config.js.map