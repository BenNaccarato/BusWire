import { BusStops } from './BusStops';
import { BusInfo } from './BusInfo';
import * as https from 'https';

export class RequestHandler {

    private busStop:BusStops;
    private busNumber:number;
    constructor(){
        this.busStop = new BusStops();
    }
    
    getInfo(stopcode:number):string {
        try {
            var XMLHttpRequest:any = require("xmlhttprequest").XMLHttpRequest;
            // request('http://www.google.com', function (error, response, body) {
            //     var request = require('google');
            //     if (!error && response.statusCode == 200) {
            //         console.log(body) // Show the HTML for the Google homepage. 
            //     }
            // });

    
        var id = this.busStop.getID(stopcode);
            var url:string = `https://api.tfl.gov.uk/StopPoint/${id}/Arrivals?app_id=&app_key=`;
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", url, false ); // false for synchronous request
            xmlHttp.send( null );
            return xmlHttp.responseText;
        } catch(error) {
            console.log(error);
            return "Error: attempts to acquire information failed";
        }
    }
    analyseInfo(info:string) {
        var busInfo:any[]= JSON.parse(info);
        var buses:BusInfo[] = new Array(busInfo.length);
        for(var n=0;n<buses.length;n++) {
            buses[n] = new BusInfo(busInfo[n]);
        }
        buses.sort(function(a:BusInfo,b:BusInfo){return a.time-b.time});
        if(buses[0].present()){
        for(var n=0;n<this.busNumber;n++){
            try{
                buses[n].print();
            } catch(error){
                console.log("No more buses available - printed all ("+buses.length+")");
                console.log(info);
                break;
            }
        }
        }
    }

    filterByStopcode(stopcode:number, busNumber:number){
        this.busNumber = busNumber;
        console.log("\nThe closest "+busNumber+" buses to the stopcode "+stopcode+" are:");
        this.analyseInfo(this.getInfo(stopcode));
    }
    filterByPostcode(postcode:string, busNumber:number){
        var stopcodes:number[] = this.busStop.getNearestTwoBusStops(postcode);
        if(stopcodes == null) {
            console.log("Error: failed to get postcode information");
            return;
        } else {
            console.log("The nearest two bus stops to this location have the stopcodes "+stopcodes[0]+" and "+stopcodes[1]);
            this.filterByStopcode(stopcodes[0],busNumber);
            this.filterByStopcode(stopcodes[1],busNumber);
        }
    }
}