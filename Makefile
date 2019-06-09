-include local.mk

VERSION:=1.0.0
NAME:=thiss-js
REGISTRY:=docker.sunet.se

all: test snyk build

snyk:
	@npm run snyk-protect

start: dev

dev:
	@npm run dev

local:
	@npm run local

clean:
	@rm -rf dist

build:
	@npm run build

standalone:
	@npm run standalone

tests:
	@npm run test

cover:
	@npm run cover

setup:
	@npm install

docker: test snyk standalone docker_build

docker_build:
	docker build --no-cache=true -t $(NAME):$(VERSION) .

docker_push_sunet:
	docker tag $(NAME):$(VERSION) $(REGISTRY)/$(NAME):$(VERSION)
	docker push $(REGISTRY)/$(NAME):$(VERSION)

