USERNAME ?= goramax

rebuild:
	docker build -t $(USERNAME)/api:latest api
	docker build -t $(USERNAME)/web:latest front
	make up

force-rebuild:
	docker build --no-cache -t $(USERNAME)/api:latest api
	docker build --no-cache -t $(USERNAME)/web:latest front
	make up

up:
	docker-compose up -d

down:
	docker-compose down -v

restart:
	docker-compose restart

stop:
	docker-compose stop

start:
	docker-compose start

delete-all:
	docker-compose down -v --rmi local --remove-orphans
	docker image prune -a -f