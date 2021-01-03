const express = require('express');
const app = express();
var SerialPort = require("serialport");

var port = 3000;

var arduinoCOMPort = "/dev/cu.usbmodem143401";

var arduinoSerialPort = new SerialPort(arduinoCOMPort, {  
  baudRate: 9600
});

arduinoSerialPort.on('open',function() {
  console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

app.get('/', function (req, res) {
    return res.send('Working');
 
})

app.get('/:action', function (req, res) {
   var action = req.params.action || req.param('action');
    if(action == 'led'){
        arduinoSerialPort.write("w");
        console.log('RED is on!');
        return res.send('Led light is on!');
    } 
    if(action == 'off') {
        arduinoSerialPort.write("t");
        console.log('RED is off!');
        return res.send("Led light is off!");
    }
    return res.send('Action: ' + action);
});

app.listen(port, function () {
  console.log('Example app listening on port http://0.0.0.0:' + port + '!');
});