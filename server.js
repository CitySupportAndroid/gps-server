const net = require('net')
const Parser = require('teltonika-parser');
const binutils = require('binutils64');
const conn = require('./connection')
const server = net.createServer();

server.on('connection', (socket) => {
    console.log('connection is made successfully!');

    socket.on('data', (data) => {
        //{"IMEI":"","latitude":"","longitude":"","altitude":"","speed":"","angle":"","satellites":"","timestamp":""}

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

        conn.insert('avl', mData, (result) => {
            if (result.status == 1) {
                console.log('data inserted!')
            } else {
                console.log('data not inserted!' + result.message)
            }
        })

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