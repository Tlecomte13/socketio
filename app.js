var app = require('express')();
var express = require('express');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
let port = '8000';

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/templates/index.html');
  });

io.sockets.on('connection', function (socket, pseudo) {

    // Dès qu'on nous donne un pseudo, on le stocke en variable de session
    socket.on('nickname', function(pseudo) {
        socket.pseudo = pseudo;
    });

    // Dès qu'on reçoit un "message" (clic sur le bouton), on le note dans la console
    socket.on('message', function (message) {
        // On récupère le pseudo de celui qui a cliqué dans les variables de session
        console.log(socket.pseudo + message);
    }); 
});


http.listen(port, () => {
    console.log('server open: http://localhost:' + port + '/');
  });