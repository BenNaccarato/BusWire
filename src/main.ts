// node --debug-brk=20481 --nolazy bin\main.js 
// node --debug-brk=20481 --nolazy bin\main.js 

import * as readline from 'readline';
import { RequestHandler } from './RequestHandler';

var stopcode:number;
var postcode:string;
var isStopcode:boolean;
var request:string;

var rl = readline.createInterface(process.stdin, process.stdout);
rl.question('Stopcode/Postcode: ', input => {
    stopcode = parseInt(input);
    if(!isNaN(stopcode)){
        console.log("Input is the stopcode: "+stopcode);
        isStopcode = true;
    } else {
        postcode = input;
        console.log("Input is the postcode: "+postcode);
        isStopcode = false;
    }
    var handler:RequestHandler = new RequestHandler();
    if(isStopcode)handler.filterByStopcode(stopcode, 5);
    else handler.filterByPostcode(postcode,5);
    quit();
});


function quit() {
    console.log("Closing the program now");
    rl.close();
    process.exit();
}