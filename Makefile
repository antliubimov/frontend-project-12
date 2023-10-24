install:
	npm ci

lint-frontend:
	make -C frontend lint

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	make start-backend & make -C frontend build

start:
	make start-backend & make start-frontend