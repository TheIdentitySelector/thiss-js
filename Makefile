all:
	@npm run test build
start:
	@npm run start
clean:
	@rm -rf dist

tests:
	@npm run test

cover:
	@npm run cover

setup:
	@npm install
