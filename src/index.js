const express = require("express");
const path = require("path");

const http = require("http")

//init server
const app  = express();
const server = http.createServer(app)
const socketio = require("socket.io");
const io = socketio(server)
// socketio.origins('origins', '*:*')
//Settings
app.set('port', 3000 )


//Middlewares

//Sockets
require('./sockets')(io);

//Static
app.use(express.static(path.join(__dirname, 'public')))
//Starting
server.listen(app.get('port'), function(){
    console.log('server running fokers')
})