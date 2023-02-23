# API Express para utilizar em aulas de HTML, CSS e JS
## ATENÇÂO: Não utilizar como exemplo para construir uma API! Este código tem erros de design de código e de segurança. Construído apenas para facilitar o entendimento das chamadas do FrontEnd!
## Tecnologias

- NodeJS
- Express
- Sequelize

## Comandos Docker para rodar Localmente:

- Executar container Node para programar:

`docker-compose -f ./dev/docker-compose.yml run dev`

- Subir container com base de dados:

`docker-compose -f ./dev/docker-compose.yml run -d db`

- Derrubar containers:

`docker-compose -f ./dev/docker-compose.yml down`

## Comandos acima também disponíveis em makefile

- make dev
- make db
- make dd

## Rodar localmente sem Docjer

### Pré-requisitos

- NodeJS
- Base Postgres configurada

### Rodas comando para startar API

`npm run start-dev`
ou `make run`
