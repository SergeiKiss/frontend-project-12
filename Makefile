install:
	git pull
	npm ci
	cd frontend; \
	npm ci

start-backend:
	npm start

build-frontend:
	npm run build

start:
	make build-frontend
	make start-backend

fix:
	cd frontend; \
	npx prettier . --write; \
	npx eslint --fix .
