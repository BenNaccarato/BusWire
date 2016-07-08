"use strict";
var BusInfo = (function () {
    function BusInfo(info) {
        this.busName = info.vehicleId;
        this.route = info.lineName;
        this.destination = info.destinationName;
        this.time = (parseInt(info.timeToStation) / 60);
    }
    BusInfo.prototype.print = function () {
        console.log("Bus with vehicle ID " + this.busName + ":\nRoute - " + this.route + "\nDestination - " + this.destination + "\nTime to arrival - " + Math.round(this.time) + " minutes");
    };
    return BusInfo;
}());
exports.BusInfo = BusInfo;
//# sourceMappingURL=BusInfo.js.map