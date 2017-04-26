var express = require('express')
var app = express()
var methodOverride = require('method-override');
var cors = require('cors');
app.use(cors({origin:true,credentials: true}));
app.options('*', cors());
var serialport = require('serialport'),
    SerialPort = serialport.SerialPort,
    portName = process.argv[2],
    portConfig = {
      baudRate: 9600,
      // call myPort.on('data') when a newline is received
      parser: serialport.parsers.readline('\n')
    }
var PidController = require('node-pid-controller');
var pid = new PidController({
  k_p: 0.25,
  k_i: 0.01,
  k_d: 0.01,
  dt: 1
});

var myPort = new SerialPort(portName, portConfig);
myPort.on('open', openPort);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function(req,res,next){
    req.header("Access-Control-Allow-Origin", "http://localhost:8100/#/Munchi:1");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "http://localhost:8100/#/Munchi:1");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(methodOverride('X-HTTP-Method-Override'));

// app.get('/rpi', function (req, res) {
//   res.sendfile("index.html");
// })

app.post('/rpi/select',function(req,res){
  var status=req.body.command;
  var desiredTemp=req.body.temp;
  if (status.err) {
    console.log(status.err);
  } else {
    console.log(status);
  }
//  var desiredTemp = 50;
  var currTemp = myPort.read();
//  var currTemp = 30;
  var tolerance = 5;
  pid.setTarget(desiredTemp);
  let correction = pid.update(currTemp)
  if (correction > tolerance) {
    sendData("Y"); // turn on
  } else if (correction < (0 - tolerance)) {
    sendData("N"); // turn off
  } else {
    console.log("Good temp!");
  }
  // sendData(status);
  res.end("yes");
})

app.listen(5000, function () {
  console.log('STARTED on port 5000!');
})

function sendData(status) {
  myPort.write(status.toString());
  console.log('Sending ' + status + ' out the serial port');
}

function openPort() {
  console.log('port open');
  console.log('baud rate: ' + myPort.options.baudRate);
}
