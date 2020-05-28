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

    socket.on('nickname', function(pseudo) {
        socket.pseudo = pseudo;
    });

    socket.on('room', function(room) {
        socket.join(room);
        console.log(socket.pseudo + ' a rejoins ou crée la salle: ' + room)
    });

    // Dès qu'on reçoit un "message" (clic sur le bouton), on le note dans la console
    socket.on('who', function (message) {
        // On récupère le pseudo de celui qui a cliqué dans les variables de session
        // console.log(socket.pseudo + message);
        console.log(io.sockets.clients());
    }); 

    socket.on('liste_room', function () {
        console.log(io.sockets.adapter.rooms);
    }); 
});

http.listen(port, () => {
    console.log('server open: http://localhost:' + port + '/');
});