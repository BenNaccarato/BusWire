// node --debug-brk=20481 --nolazy bin\main.js 
// node --debug-brk=20481 --nolazy bin\main.js 
"use strict";
var readline = require('readline');
var RequestHandler_1 = require('./RequestHandler');
var stopcode;
var postcode;
var isStopcode;
var request;
var rl = readline.createInterface(process.stdin, process.stdout);
rl.question('Stopcode/Postcode: ', function (input) {
    stopcode = parseInt(input);
    if (!isNaN(stopcode)) {
        console.log("Input is the stopcode: " + stopcode);
        isStopcode = true;
    }
    else {
        postcode = input;
        console.log("Input is the postcode: " + postcode);
        isStopcode = false;
    }
    var handler = new RequestHandler_1.RequestHandler();
    if (isStopcode)
        handler.filterByStopcode(stopcode, 5);
    else
        handler.filterByPostcode(postcode, 5);
    quit();
});
function quit() {
    console.log("Closing the program now");
    rl.close();
    process.exit();
}
//# sourceMappingURL=main.js.map