install:
	git pull
	npm ci

run-server:
	npx start-server -s ./frontend/build