install:
	git pull
	npm ci

run-server:
	npx start-server -s ./frontend/build

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

lint-frontend:
	make -C frontend lint