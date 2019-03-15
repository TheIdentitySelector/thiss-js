all:
	@npm run test build

start:
	@npm run start

clean:
	@rm -rf dist

build:
	@npm run build

tests:
	@npm run test

cover:
	@npm run cover

setup:
	@npm install

deploy:
	rsync -avz --exclude .git --exclude CNAME --exclude README.md --delete dist/ $(TARGET)
