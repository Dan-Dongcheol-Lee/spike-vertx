var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');
var http = require('vertx/http');
var eventBus = vertx.eventBus;

var httpServer = http.createHttpServer();
vertx.createSockJSServer(httpServer).bridge({prefix: '/channel'}, [{}], [{}]);
httpServer.listen(13445, 'localhost', function(err) {
    if (err) {
        console.log('Unable to start a server: ' + err);
    } else {
        eventBus.registerHandler('other.topic', function(message, replier) {
            console.log('Received a message from client:' + JSON.stringify(message));
            replier({name: 'Reply from server:' + message.name});
        });

        vertx.setPeriodic(10000, function(timerID) {
            console.log("Every 10 seconds this is printed" + new java.util.Date());
            eventBus.publish('some.topic', {name: 'Notice from server:' + new java.util.Date()});
        });

        console.log('The [channel/websocket] push interface has been started successfully');
    }
});
