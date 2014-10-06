package spike.vertx;

import org.vertx.java.core.eventbus.EventBus;
import org.vertx.java.core.http.HttpServer;
import org.vertx.java.core.json.JsonArray;
import org.vertx.java.core.json.JsonObject;
import org.vertx.java.platform.Verticle;

import java.io.File;
import java.util.Date;

public class MonitorVerticle extends Verticle {
    @Override
    public void start() {
        HttpServer httpServer = vertx.createHttpServer();
        JsonObject config = new JsonObject().putString("prefix", "/monitor");

        JsonArray noPermitted = new JsonArray();
        noPermitted.add(new JsonObject());

        vertx.createSockJSServer(httpServer).bridge(config, noPermitted, noPermitted);
        httpServer.listen(8090, event -> {
            EventBus eventBus = vertx.eventBus();
            vertx.setPeriodic(2000, timerIdentifier ->
                    eventBus.publish("monitor-spike", createMessage()));
        });
    }


    private JsonObject createMessage() {
        JsonObject message = new JsonObject();
        Runtime runtime = Runtime.getRuntime();
        message.putNumber("cores", runtime.availableProcessors());
        message.putNumber("freeMem", runtime.freeMemory());
        message.putNumber("totalMem", runtime.totalMemory());
        message.putValue("date", new Date().toString());
        return message;

//        File[] roots = File.listRoots();
//
//        /* For each filesystem root, print some info */
//        for (File root : roots) {
//            System.out.println("File system root: " + root.getAbsolutePath());
//            System.out.println("Total space (bytes): " + root.getTotalSpace());
//            System.out.println("Free space (bytes): " + root.getFreeSpace());
//            System.out.println("Usable space (bytes): " + root.getUsableSpace());
//        }
    }
}
