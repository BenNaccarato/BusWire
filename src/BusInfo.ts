export class BusInfo {
    busName:string;
    route:string;
    destination:string;
    time:number;

    constructor(info:Object){
        this.busName = info.vehicleId;
        this.route = info.lineName;
        this.destination = info.destinationName;
        this.time = (parseInt(info.timeToStation)/60);
    }

    print(){
        console.log(`Bus with vehicle ID ${this.busName}:\nRoute - ${this.route}\nDestination - ${this.destination}\nTime to arrival - ${Math.round(this.time)} minutes`);
    }
}