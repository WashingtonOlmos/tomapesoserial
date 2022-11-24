var express = require('express');
var app = express()               

var port = 8080;

const userRouter = require('./app/routes/user')

app.use(userRouter);

app.listen(port,()=>{
    console.log("servidor a la escucha en puerto 8080")
})




