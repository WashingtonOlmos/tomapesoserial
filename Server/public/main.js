let contador = 0;

document.getElementById('estableId').classList.add('parpadea', 'tomando_dato');
estableId.innerHTML = 'Tomando Datos...';

const socket = io();

socket.on('kilos', (data)=>{
    console.log(data);
    let show = data.match("[0-9]+");

    let kilos = document.getElementById('kilosId');
    kilos.innerHTML = show + ' Kilos';

    let resultado = data.includes('D')

    if(resultado){
        contador ++;
        console.log(contador)

        if(contador >= 3){
            socket.disconnect()
            document.getElementById('estableId').classList.remove('parpadea', 'tomando_dato');
            document.getElementById('estableId').classList.add('dato_estable');
          
            estableId.innerHTML = 'Total del pesaje';

            setTimeout(()=>{
                contador = 0;
                document.getElementById('estableId').classList.remove('dato_estable');
                document.getElementById('estableId').classList.add('parpadea', 'tomando_dato');
                estableId.innerHTML = 'Tomando Datos...';
                socket.connect();
            },3000)
        }
    }else {
        contador = 0;
    }
    
})

