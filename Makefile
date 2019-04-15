TARGET := ../origin.thiss.io/
all: test snyk build

snyk:
	@npm run snyk-protect

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

deploy: all
	rsync -avz --exclude .git --exclude CNAME --exclude README.md --delete dist/ $(TARGET)
	touch $(TARGET)/.nojekyll
