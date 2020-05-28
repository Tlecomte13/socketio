var socket = io.connect();

$('form').submit(function(e) {
    e.preventDefault();
    
    return false;
});

//NICKNAME INPUT VALID
$("input#nickname").focusout(function() { 
    let pseudo = $('input#nickname').val();

    if (pseudo === ''){
        $('input#nickname').removeClass('is-valid');
        $('input#nickname').addClass('is-invalid');
        socket.emit('nickname', pseudo);
    }else{
        $('input#nickname').removeClass('is-invalid');
        $('input#nickname').addClass('is-valid');
        socket.emit('nickname', pseudo);
    }
}); 

//ROOM INPUT VALID
$("input#room").focusout(function() { 
    if ($("input#room").val().length < 4 || $("input#room").val().length > 4){
        $(this).removeClass('is-valid');
        $(this).addClass('is-invalid');
    }else{
        $(this).removeClass('is-invalid');
        $(this).addClass('is-valid');
    }
}); 

$("input#create").click(function(){
    socket.emit('room', random_room(4));
});

$("input#join").click(function(){

    socket.emit('room', $('input#room').val());
    
});


function random_room(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};


// Lorsqu'on clique sur le bouton, on envoie un "message" au serveur
$('#poke').click(function () {
    socket.emit('who', ' est connecté(e)');
    socket.emit('room');
})

$('#rooms').click(function () {
    socket.emit('liste_room');
})