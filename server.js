const net = require('net')
const Parser = require('teltonika-parser');
const binutils = require('binutils64');
// const conn = require('./connection')
var firebase = require("firebase/app");
const server = net.createServer();

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDX5qQAcYJzHqzgmMdkQhgRSuYOfR_33e0",
    authDomain: "tcpip-d1dce.firebaseapp.com",
    databaseURL: "https://tcpip-d1dce-default-rtdb.firebaseio.com",
    projectId: "tcpip-d1dce",
    storageBucket: "tcpip-d1dce.appspot.com",
    messagingSenderId: "797341404546",
    appId: "1:797341404546:web:6d11bae6abf5d476b3539b",
    measurementId: "G-8593GKEYB2"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


server.on('connection', (socket) => {
    console.log('connection is made successfully!');

    socket.on('data', (data) => {

        console.log("data");
        console.log(JSON.parse(data.toString().trim()));

        let obj = JSON.parse(data.toString().trim())

        let mData = {
            imei: obj.imei,
            latitude: obj.latitude,
            longitude: obj.longitude,
            altitude: obj.altitude,
            speed: obj.speed,
            angle: obj.angle,
            satellite: obj.satellite
        }

        
            firebase.database().ref('users/' + Date.now()).set(mData);
          

    })

    socket.once('close', () => {
        console.log('connection has closed!')
    })


    socket.once('error', (err) => {
        console.log('connection has closed!' + err.message)
    })
})

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    // hex = hex.replace(/\s/g, '');
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

server.listen(5005, () => {
    console.log('listening on 1010')
})