const express = require('express');
const app = express();
const { SerialPort } = require('serialport')
const port = new SerialPort({
  path: '/dev/tty-usbserial1',
  baudRate: 9600,
})

port.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message)
  }

  // Because there's no callback to write, write errors will be emitted on the port:
  port.write('main screen turn on')
})

// The open event is always emitted
port.on('open', function() {
  // open logic
})


app.get('/', function (req, res) {

    return res.send('Working');
 
})

app.get('/:action', function (req, res) {
    
   var action = req.params.action || req.param('action');
    
    if(action == 'led'){
        port.write("w");
        return res.send('Led light is on!');
    } 
    if(action == 'off') {
        port.write("t");
        return res.send("Led light is off!");
    }
    
    return res.send('Action: ' + action);
 
});

app.listen(3000, function () {
    console.log('listening on port 3000!')
})

