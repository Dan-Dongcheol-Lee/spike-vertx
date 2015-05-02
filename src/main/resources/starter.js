var container = require('vertx/container');

//container.deployVerticle("spike.vertx.ChatVerticle", 2);
//container.deployVerticle("spike.vertx.MonitorVerticle", 2);
//container.deployVerticle("simple-push.js", 3);
container.deployVerticle("simple-chat.js");