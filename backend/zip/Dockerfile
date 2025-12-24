# ---- Build stage (uses Maven inside Docker to build your jar) ----
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy Maven files first for better caching
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw mvnw
RUN ./mvnw -q -DskipTests dependency:go-offline

# Now copy source and build
COPY src src
RUN ./mvnw -q -DskipTests package

# ---- Run stage (small image just to run the jar) ----
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]