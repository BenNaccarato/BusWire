"use strict";
var BusInfo = (function () {
    function BusInfo(info) {
        try {
            this.busName = info.vehicleId;
            this.busName = this.busName.split(".")[0];
            this.route = info.lineName;
            this.destination = info.destinationName;
            this.time = (parseInt(info.timeToStation) / 60);
        }
        catch (error) {
            console.log("No buses found");
        }
    }
    BusInfo.prototype.print = function () {
        if (this.busName != undefined)
            console.log("Bus with vehicle ID " + this.busName + ":\nRoute - " + this.route + "\nDestination - " + this.destination + "\nTime to arrival - " + Math.round(this.time) + " minutes");
    };
    BusInfo.prototype.present = function () { return this.busName != undefined; };
    return BusInfo;
}());
exports.BusInfo = BusInfo;
//# sourceMappingURL=BusInfo.js.map