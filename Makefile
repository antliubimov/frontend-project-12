install:
	npm ci

lint-frontend:
	make -C frontend lint

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push -u origin main

start:
	make start-backend & make start-frontend