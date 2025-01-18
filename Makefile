up:
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose build

test:
	docker exec -it backend-etg npm run test

migrate-seed:
	docker exec -it backend-etg npm run migration:run && docker exec -it backend-etg npm run seed

exec:
	docker exec -it backend-etg bash