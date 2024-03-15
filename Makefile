install:
	npm ci

lint-frontend:
	make -C frontend lint

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	npm run build && npm start

start:
	make start-backend & make start-frontend

build:
	npm run build