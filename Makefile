install:
	git pull
	npm ci

start-backend:
	npx start-server

build-frontend:
	npm run build

start-production:
	npm run build
	npm start

fix:
	cd frontend; \
	npx prettier . --write; \
	npx eslint --fix .
