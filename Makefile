all:
	@npm run test build
start:
	@npm run start
clean:
	@rm -rf dist

tests:
	@npm run test

setup:
	@npm install
