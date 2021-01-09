
const Gps = require('gps');

var gps = new GPS;
 
// Add an event listener on all protocols
gps.on('data', function(parsed) {
    console.log(parsed);
});