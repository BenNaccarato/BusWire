"use strict";
var BusStops = (function () {
    function BusStops() {
        this.analyseTable();
    }
    BusStops.prototype.analyseTable = function () {
        try {
            var filename = "bus-stops.csv";
            var fs = require('fs');
            this.busStops = (fs.readFileSync(filename, 'utf8')).split("\r\n");
        }
        catch (error) {
            console.log("Error: failed to read bus-stops.csv");
        }
    };
    BusStops.prototype.getID = function (stopcode) {
        for (var n = 0; n < this.busStops.length; n++) {
            var info = this.busStops[n].split(",");
            var code = parseInt(info[1]);
            if (stopcode == code) {
                console.log("returning " + info[2]);
                return info[2];
            }
        }
        console.log("Error: bus stop not found");
        return null;
    };
    BusStops.prototype.getNearestTwoBusStops = function (postcode) {
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var url = "http://api.postcodes.io/postcodes/" + postcode;
        try {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url, false);
            xmlHttp.send(null);
            var postcodeInfo = JSON.parse(xmlHttp.responseText);
            var eastings = postcodeInfo.result.eastings;
            var northings = postcodeInfo.result.northings;
            var stopcodes = [NaN, NaN];
            var bestDistance = NaN;
            var secondBestDistance = NaN;
            this.busStops.forEach(function (stop) {
                var info = stop.split(",");
                var stopEasting = parseInt(info[4]);
                var stopNorthing = parseInt(info[4]);
                var distanceSquared = (eastings - stopEasting) * (eastings - stopNorthing) + (northings - stopNorthing) * (northings - stopNorthing);
                if (!isNaN(distanceSquared) && (isNaN(bestDistance) || distanceSquared < bestDistance)) {
                    secondBestDistance = bestDistance;
                    bestDistance = distanceSquared;
                    stopcodes[1] = stopcodes[0];
                    stopcodes[0] = parseInt(info[0]);
                }
                else {
                    if (isNaN(secondBestDistance) || distanceSquared < secondBestDistance) {
                        secondBestDistance = distanceSquared;
                        stopcodes[1] = parseInt(info[1]);
                    }
                }
            });
            if (isNaN(stopcodes[0]) || isNaN(stopcodes[1]))
                return null;
            return stopcodes;
        }
        catch (error) {
            return null;
        }
    };
    return BusStops;
}());
exports.BusStops = BusStops;
//# sourceMappingURL=BusStops.js.map