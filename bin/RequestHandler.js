"use strict";
var BusStops_1 = require('./BusStops');
var BusInfo_1 = require('./BusInfo');
var RequestHandler = (function () {
    function RequestHandler() {
        this.busStop = new BusStops_1.BusStops();
    }
    RequestHandler.prototype.getInfo = function (stopcode) {
        try {
            var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            // request('http://www.google.com', function (error, response, body) {
            //     var request = require('google');
            //     if (!error && response.statusCode == 200) {
            //         console.log(body) // Show the HTML for the Google homepage. 
            //     }
            // });
            var id = this.busStop.getID(stopcode);
            var url = "https://api.tfl.gov.uk/StopPoint/" + id + "/Arrivals?app_id=&app_key=";
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url, false); // false for synchronous request
            xmlHttp.send(null);
            return xmlHttp.responseText;
        }
        catch (error) {
            console.log(error);
            return "Error: attempts to acquire information failed";
        }
    };
    RequestHandler.prototype.analyseInfo = function (info) {
        var busInfo = JSON.parse(info);
        var buses = new Array(busInfo.length);
        for (var n = 0; n < buses.length; n++) {
            buses[n] = new BusInfo_1.BusInfo(busInfo[n]);
        }
        buses.sort(function (a, b) { return a.time - b.time; });
        if (buses[0].present()) {
            for (var n = 0; n < this.busNumber; n++) {
                try {
                    buses[n].print();
                }
                catch (error) {
                    console.log("No more buses available - printed all (" + buses.length + ")");
                    console.log(info);
                    break;
                }
            }
        }
    };
    RequestHandler.prototype.filterByStopcode = function (stopcode, busNumber) {
        this.busNumber = busNumber;
        console.log("\nThe closest " + busNumber + " buses to the stopcode " + stopcode + " are:");
        this.analyseInfo(this.getInfo(stopcode));
    };
    RequestHandler.prototype.filterByPostcode = function (postcode, busNumber) {
        var stopcodes = this.busStop.getNearestTwoBusStops(postcode);
        if (stopcodes == null) {
            console.log("Error: failed to get postcode information");
            return;
        }
        else {
            console.log("The nearest two bus stops to this location have the stopcodes " + stopcodes[0] + " and " + stopcodes[1]);
            this.filterByStopcode(stopcodes[0], busNumber);
            this.filterByStopcode(stopcodes[1], busNumber);
        }
    };
    return RequestHandler;
}());
exports.RequestHandler = RequestHandler;
//# sourceMappingURL=RequestHandler.js.map