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



app.get('/rpi', function (req, res) {
  res.sendfile("index.html")
})

app.post('/rpi/select',function(req,res){
  var powerstatus=req.body.powerstatus
  res.end("yes")
})

app.listen(3000, function () {
  console.log('STARTED on port 3000!')
})

var myPort = new SerialPort(portName, portConfig)

myPort.on('open', openPort)

function openPort() {
  console.log('port open')
  console.log('baud rate: ' + myPort.options.baudRate)

  function sendData() {
    myPort.write(powerstatus.toString())
    console.log('Sending ' + powerstatus + ' out the serial port')
  }

  setInterval(sendData, 500)
}
