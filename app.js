var express = require('express')
var app = express()
var serialport = require('serialport'),
    SerialPort = serialport.SerialPort,
    portName = process.argv[2],
    portConfig = {
      baudRate: 9600,
      // call myPort.on('data') when a newline is received
      parser: serialport.parsers.readline('\n')
    }

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/rpi', function (req, res) {
  res.sendfile("index.html");
})

app.post('/rpi/select',function(req,res){
  var status=req.body.powerstatus;
  sendData(status);
  res.end("yes");
})

app.listen(3000, function () {
  console.log('STARTED on port 3000!');
})

var myPort = new SerialPort(portName, portConfig);

myPort.on('open', openPort);

function sendData(status) {
    myPort.write(status.toString());
    console.log('Sending ' + status + ' out the serial port');
  }

function openPort() {
  console.log('port open');
  console.log('baud rate: ' + myPort.options.baudRate);
}
