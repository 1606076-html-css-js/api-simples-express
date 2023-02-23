

.PHONY: dev db dd

dev: db
	@docker-compose -f ./dev/docker-compose.yml run dev

db:
	@docker-compose -f ./dev/docker-compose.yml run -d db

dd:
	@docker-compose -f ./dev/docker-compose.yml down

run:
	npm run start-dev

prod: db run