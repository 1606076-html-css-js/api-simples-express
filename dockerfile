FROM docker:latest

EXPOSE 3000
EXPOSE 5432

WORKDIR /app
COPY . /app

# ENTRYPOINT "docker-compose -f ./dev/docker-compose.yml run -d db"