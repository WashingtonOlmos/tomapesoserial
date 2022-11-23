// comunicacion serial
    const { SerialPort } = require ('serialport');
    const { ReadlineParser } = require('@serialport/parser-readline');
//

// servidor
    const http = require ('http');
    const { Server } = require ("socket.io");
    const express = require ('express');
// servidor

const app = express();
const server = http.createServer(app);  // creamo el servidor
const io = new Server(server, {});
server.listen(3000,()=>{
    console.log('servidor en puerto 3000')
})

app.use(express.static(__dirname + '/public'));


const port = new SerialPort({
    path: 'COM3',
    baudRate : 9600,
    autoOpen: true
}, function(err){
    if(err){
        return console.log('Error: ', err.message);
    }
})


port.on('open', function() {
    return console.log('puerto abierto');
})

port.on('error', function(err){
    console.log(err);
})

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data',function(data) {
    console.log(String(data)) // Utilizo String para convertilo, ya que no solo recibo enteros.
    io.emit('kilos',data);
});

