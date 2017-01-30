"use strict";
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
    Config.BaseUrl = "";
    Config.OfficeHoursStart = moment("6:00", "HH:mm");
    Config.OfficeHoursEnd = moment("20:00", "HH:mm");
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=configLocal.js.map