"use strict";
var PostCodeHandler = (function () {
    function PostCodeHandler() {
    }
    PostCodeHandler.getNearestTwoBusStops = function (postcode) {
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var url = "http://api.postcodes.io/postcodes/" + postcode;
        try {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url, false);
            xmlHttp.send(null);
            var postcodeInfo = JSON.parse(xmlHttp.responseText);
            var eastings = postcodeInfo.result.eastings;
            var northings = postcodeInfo.result.northings;
            var filename = "bus-stops.csv";
            var fs = require('fs');
            var busStops = (fs.readFileSync(filename, 'utf8')).split("\r\n");
            var stopcodes = [NaN, NaN];
            var bestDistance = NaN;
            var secondBestDistance = NaN;
            busStops.forEach(function (stop) {
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
    return PostCodeHandler;
}());
exports.PostCodeHandler = PostCodeHandler;
//# sourceMappingURL=PostCodeHandler.js.map