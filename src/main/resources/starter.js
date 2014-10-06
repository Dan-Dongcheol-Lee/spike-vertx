var container = require('vertx/container');

container.deployVerticle("spike.vertx.ChatVerticle");
container.deployVerticle("spike.vertx.MonitorVerticle");