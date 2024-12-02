VERSION:=2.1.11
PWD:=$(shell pwd)
NAME:=thiss-js
REGISTRY:=docker.sunet.se
ifndef BASE_URL
override BASE_URL = $(DEPLOY_PRIME_URL)/
endif
ifndef LOGLEVEL
override LOGLEVEL = warn
endif
ifndef DEFAULT_CONTEXT
override DEFAULT_CONTEXT = thiss.io
endif

export PATH := node_modules/.bin:$(PATH)

all: standalone

-include local.mk

snyk:
	@npm run snyk

start: dev

dev:
	@npm run dev

local:
	@npm run local

beta:
	@npm run beta

clean:
	@rm -rf dist

publish:
	@npm publish --access public

build_in_docker: thiss_builder
	docker run -ti -v $(PWD)/dist:/usr/src/app/dist -e BASE_URL=$(BASE_URL) -e COMPONENT_URL=$(COMPONENT_URL) -e MDQ_URL=$(MDQ_URL) -e PERSISTENCE_URL=$(PERSISTENCE_URL) -e SEARCH_URL=$(SEARCH_URL) -e STORAGE_DOMAIN=$(STORAGE_DOMAIN) -e LOGLEVEL=$(LOGLEVEL) -e DEFAULT_CONTEXT=$(DEFAULT_CONTEXT) -e WHITELIST=${WHITELIST} thiss-builder:$(VERSION) webpack --config webpack.prod.js
	
build: test snyk
	env BASE_URL=$(BASE_URL) COMPONENT_URL=$(COMPONENT_URL) MDQ_URL=$(MDQ_URL) PERSISTENCE_URL=$(PERSISTENCE_URL) SEARCH_URL=$(SEARCH_URL) STORAGE_DOMAIN=$(STORAGE_DOMAIN) LOGLEVEL=$(LOGLEVEL) DEFAULT_CONTEXT=$(DEFAULT_CONTEXT) WHITELIST=${WHITELIST} webpack --config webpack.prod.js

standalone: standalone_in_docker

standalone_in_docker:
	make BASE_URL='$$$${BASE_URL}' COMPONENT_URL='$$$${BASE_URL}cta/' MDQ_URL='$$$${MDQ_URL}' PERSISTENCE_URL='$$$${BASE_URL}ps/' SEARCH_URL='$$$${SEARCH_URL}' STORAGE_DOMAIN='$$$${STORAGE_DOMAIN}' LOGLEVEL='$$$${LOGLEVEL}' DEFAULT_CONTEXT='$$$${DEFAULT_CONTEXT}' WHITELIST='$$$${WHITELIST}' build_in_docker

netlify: test snyk
	env BASE_URL=$(BASE_URL) COMPONENT_URL=$(BASE_URL)cta/ MDQ_URL=$(MDQ_URL) PERSISTENCE_URL=$(BASE_URL)ps/ SEARCH_URL=$(SEARCH_URL) STORAGE_DOMAIN=$(STORAGE_DOMAIN) LOGLEVEL=$(LOGLEVEL) DEFAULT_CONTEXT=$(DEFAULT_CONTEXT) WHITELIST=netlify.app,build.thiss.io webpack --config webpack.prod.js

sameserver:
	make BASE_URL='/' COMPONENT_URL='/cta/' MDQ_URL='/entities/' PERSISTENCE_URL='/ps/' SEARCH_URL='/api/search' STORAGE_DOMAIN='/' LOGLEVEL='error' DEFAULT_CONTEXT='thiss.io' build

tests:
	@npm run test

cover:
	@npm run cover

setup:
	@npm ci

docker: standalone_in_docker docker_build

docker_build:
	docker build --no-cache=true -t $(NAME):$(VERSION) .

docker_push_sunet:
	docker tag $(NAME):$(VERSION) $(REGISTRY)/$(NAME):$(VERSION)
	docker push $(REGISTRY)/$(NAME):$(VERSION)

thiss_builder:
	docker build -t thiss-builder:$(VERSION) -f Dockerfile.build .
