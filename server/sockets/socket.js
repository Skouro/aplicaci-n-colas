const {io} = require('../server');
const {TicketControl} = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.on('siguienteTicket', (data, callback) => {
        let siguente = ticketControl.siguente();
        console.log(siguente);
        callback(siguente);
    });

    client.emit('estadoActual', {
        estado: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                message: 'El escritorios es requerido'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        client.broadcast.emit('ultimos4',{ultimos4: ticketControl.getUltimos4()});
    });
});