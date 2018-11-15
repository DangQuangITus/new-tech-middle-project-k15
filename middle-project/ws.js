var WebSocket = require('ws');

var SOCKET_PORT = process.env.SOCKET_PORT || 40510;
var socketServer;

if (!socketServer) {
    socketServer = new WebSocket.Server({
        port: SOCKET_PORT
    });

    socketServer.on('connection', ws => {

        ws.on('message', msg => {
            console.log(`receive: ${msg}`);
        });

        // var num = 0;
        // setInterval(() => {
        //     ws.send(num++);
        // }, 1000);
    });

    console.log(`WS running on port ${SOCKET_PORT}`);
}

var broadcastAll = msg => {
    for (var c of socketServer.clients) {
        console.log(c.readyState);
        if (c.readyState === WebSocket.OPEN) {
            c.send(msg);
        }
    }
}

module.exports = {
    socketServer,
    broadcastAll
}