var socket = io();
var label = $('#lblNuevoTicket');
socket.on('connect', function () {
    console.log('Conectado con el servidor')
});
socket.on('disconnect', function () {
    console.log('Desconectado del servidor')
});

$('button').on('click', function () {
    console.log('click');
    socket.emit('siguienteTicket', null, (siguenteTicket) => {
        label.text(siguenteTicket);
    });
});

socket.on('estadoActual', function (data) {
    console.log(data);
    label.text(data.estado);
});