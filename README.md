# Spike for Vert.x

gradlew fatJar
java -jar build/libs/my-module-1.0.0-fat.jar -conf conf.json -cluster -ha -hagroup g -quorum 2