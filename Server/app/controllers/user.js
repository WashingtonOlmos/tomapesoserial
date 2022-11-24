// comunicacion serial
const { SerialPort } = require ('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const port = new SerialPort({
    path: 'COM3',
    baudRate : 9600,
    autoOpen: true
}, function(err){
    if(err){
        return console.log('Error: ', err.message);
    }
})

let contador = 0;

exports.getData = (req, res)=>{

        const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
        parser.on('data',function(data) {
        let resultado = data.includes('D')
     
         if(resultado){
            contador ++;
            if(contador >= 4){

                const final = {
                    peso : String(data)
                }
                res.send(final);
                /* console.log(final) */
            }
        }else {
            contador = 0;
        }
        
        });

}