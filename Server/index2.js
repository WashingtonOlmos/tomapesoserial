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
const final =  {};
let datos = () => {
    const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
    parser.on('data',function(data) {
    let resultado = data.includes('D')
 
     if(resultado){
         contador ++;
         if(contador >= 1){

            const final = {
                peso : String(data)
            }
            
            console.log(final)
         }
     }else {
         contador = 0;
     }

    });
}

/* module.exports = datos(); */

const datos2 = {
    "producto": "algo",
}
console.log(datos2);