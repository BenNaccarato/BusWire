export class BusStops {


    constructor(){
        this.analyseTable();
    }
    private busStops:string[];

    private analyseTable(){
        try {

            var filename:string = "bus-stops.csv";
            var fs = require('fs');
            this.busStops = (fs.readFileSync(filename,'utf8')).split("\r\n");
        } catch(error) {
            console.log("Error: failed to read bus-stops.csv");
        }

    }
    getID(stopcode:number):string{
        for(var n=0;n<this.busStops.length;n++) {
                var info:string[] = this.busStops[n].split(",");
                var code:number = parseInt(info[1]);
                if(stopcode == code){
                    console.log("returning "+info[2]);
                    return info[2];
                }
        }
        console.log("Error: bus stop not found");
        return null;
    }
    getNearestTwoBusStops(postcode:string):number[] {
        
        var XMLHttpRequest:any = require("xmlhttprequest").XMLHttpRequest;
        var url:string = "http://api.postcodes.io/postcodes/"+postcode;
        try {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", url, false );
            xmlHttp.send( null );
            var postcodeInfo:any = JSON.parse(xmlHttp.responseText);
            var eastings:number = postcodeInfo.result.eastings;
            var northings:number = postcodeInfo.result.northings;
            var stopcodes:number[] = [NaN,NaN];

            var bestDistance:number = NaN;
            var secondBestDistance:number = NaN;
            this.busStops.forEach(stop => {
                var info:string[] = stop.split(",");
                var stopEasting:number = parseInt(info[4]);
                var stopNorthing:number = parseInt(info[5]);
                var distanceSquared:number = (eastings - stopEasting)*(eastings-stopEasting) + (northings - stopNorthing)*(northings - stopNorthing);
                if(!isNaN(distanceSquared) && (isNaN(bestDistance) || distanceSquared < bestDistance)) {
                    secondBestDistance = bestDistance;
                    bestDistance = distanceSquared;
                    stopcodes[1] = stopcodes[0];
                    stopcodes[0] = parseInt(info[1]);
                } else {
                    if(isNaN(secondBestDistance) || distanceSquared < secondBestDistance) {
                        secondBestDistance = distanceSquared;
                        stopcodes[1] = parseInt(info[1]);
                    }
                }
            });
            if(isNaN(stopcodes[0])|| isNaN(stopcodes[1]))return null;

            return stopcodes;
        } catch (error) {
            return null;
        }
    }
}