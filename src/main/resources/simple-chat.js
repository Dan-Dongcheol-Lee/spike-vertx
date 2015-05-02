var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');
var http = require('vertx/http');
var eventBus = vertx.eventBus;

var httpServer = http.createHttpServer();
vertx.createSockJSServer(httpServer).bridge({prefix: '/messy-chat2'}, [{}], [{}]);
httpServer.listen(8082, 'localhost', function(err) {
    if (err) {
        console.log('Unable to start a server: ' + err);
    } else {
        console.log('The [/messy-chat2] chat instance has been started successfully');
    }
});
