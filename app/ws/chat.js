// INTIALIZING WEBSOCKET
// -------------------------------------------------------------
const http = require('http');
const WebSocket = require('ws');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.broadcast = function broadcast(data) {

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
};

wss.on('connection',(ws) => {

    ws.on('message', (data) => {
        messages.push(data);
        wss.broadcast(messages);
    });


    ws.on('close', function () {
        console.log('stopping client interval');
    });
});