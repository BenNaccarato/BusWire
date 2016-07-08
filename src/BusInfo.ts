export class BusInfo {
    busName:string;
    route:string;
    destination:string;
    time:number;

    constructor(info:any){
        try {
            this.busName = info.vehicleId;
            this.busName = this.busName.split(".")[0];
            this.route = info.lineName;
            this.destination = info.destinationName;
            this.time = (parseInt(info.timeToStation)/60);
        } catch (error) {
            console.log("No buses found");            
        }
    }

    print(){
        if(this.busName!= undefined)console.log(`Bus with vehicle ID ${this.busName}:\nRoute - ${this.route}\nDestination - ${this.destination}\nTime to arrival - ${Math.round(this.time)} minutes`);
    }
    present():boolean {return this.busName != undefined;}
}