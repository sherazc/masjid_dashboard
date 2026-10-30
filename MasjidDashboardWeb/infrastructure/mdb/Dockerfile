FROM eclipse-temurin:25-jre
WORKDIR /app
ADD ./mdb.jar /app/mdb.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "/app/mdb.jar"]
