-include local.mk

VERSION:=1.1.1
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

snyk:
	@npm run snyk-protect

start: dev

dev:
	@npm run dev

local:
	@npm run local

clean:
	@rm -rf dist

build: test snyk
	env BASE_URL=$(BASE_URL) COMPONENT_URL=$(COMPONENT_URL) MDQ_URL=$(MDQ_URL) PERSISTENCE_URL=$(PERSISTENCE_URL) SEARCH_URL=$(SEARCH_URL) STORAGE_DOMAIN=$(STORAGE_DOMAIN) LOGLEVEL=$(LOGLEVEL) DEFAULT_CONTEXT=$(DEFAULT_CONTEXT) webpack --config webpack.prod.js

standalone: test snyk
	make BASE_URL='$$$${BASE_URL}' COMPONENT_URL='$$$${BASE_URL}cta/' MDQ_URL='$$$${MDQ_URL}' PERSISTENCE_URL='$$$${BASE_URL}ps/' SEARCH_URL='$$$${SEARCH_URL}' STORAGE_DOMAIN='$$$${STORAGE_DOMAIN}' LOGLEVEL='$$$${LOGLEVEL}' DEFAULT_CONTEXT='$$$${DEFAULT_CONTEXT}' build

netlify: test snyk
	env BASE_URL=$(BASE_URL) COMPONENT_URL=$(BASE_URL)cta/ MDQ_URL=$(MDQ_URL) PERSISTENCE_URL=$(BASE_URL)ps/ SEARCH_URL=$(SEARCH_URL) STORAGE_DOMAIN=$(STORAGE_DOMAIN) LOGLEVEL=$(LOGLEVEL) DEFAULT_CONTEXT=$(DEFAULT_CONTEXT) webpack --config webpack.prod.js

sameserver:
	make BASE_URL='/' COMPONENT_URL='/cta/' MDQ_URL='/entities/' PERSISTENCE_URL='/ps/' SEARCH_URL='/api/search' STORAGE_DOMAIN='/' LOGLEVEL='error' DEFAULT_CONTEXT='thiss.io' build

tests:
	@npm run test

cover:
	@npm run cover

setup:
	@npm install

docker: standalone docker_build

docker_build:
	docker build --no-cache=true -t $(NAME):$(VERSION) .

docker_push_sunet:
	docker tag $(NAME):$(VERSION) $(REGISTRY)/$(NAME):$(VERSION)
	docker push $(REGISTRY)/$(NAME):$(VERSION)

