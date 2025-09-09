VERSION:=2.1.139
PREV_VERSION:=2.1.98
PRE_RELEASE:=false
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
ifndef SAA_COMPLIANT_BROWSERS
override SAA_COMPLIANT_BROWSERS = 'chrome, chromium, edge, edge-chromium, vivaldi'
endif
ifndef PUBLIC_PATH_PREFIX
override PUBLIC_PATH_PREFIX =
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
	@sudo rm -rf dist
	@sudo rm -rf dist-pre/
	@git checkout dist-pre/

publish:
	@npm publish --access public

build_in_docker: thiss_builder
	docker run -ti -v $(PWD)/dist:/usr/src/app/dist -e BASE_URL=$(BASE_URL) -e COMPONENT_URL=$(COMPONENT_URL) -e MDQ_URL=$(MDQ_URL) -e PERSISTENCE_URL=$(PERSISTENCE_URL) -e SEARCH_URL=$(SEARCH_URL) -e STORAGE_DOMAIN=$(STORAGE_DOMAIN) -e LOGLEVEL=$(LOGLEVEL) -e DEFAULT_CONTEXT=$(DEFAULT_CONTEXT) -e WHITELIST=$(WHITELIST) -e MIN_SEARCH_LENGTH=$(MIN_SEARCH_LENGTH) -e SAA_COMPLIANT_BROWSERS=$(SAA_COMPLIANT_BROWSERS) thiss-builder:$(VERSION) webpack --config webpack.prod.js
	@sudo rm -rf dist-pre/$(VERSION)
	@sudo mkdir -p dist-pre/$(VERSION)
	@sudo mv dist/* dist-pre/$(VERSION)/
	
build: test snyk
	env BASE_URL='$${BASE_URL}' COMPONENT_URL='$${COMPONENT_URL}' MDQ_URL='$${MDQ_URL}' PERSISTENCE_URL='$${PERSISTENCE_URL}' SEARCH_URL='$${SEARCH_URL}' STORAGE_DOMAIN='$${STORAGE_DOMAIN}' LOGLEVEL='$${LOGLEVEL}' DEFAULT_CONTEXT='$${DEFAULT_CONTEXT}' WHITELIST='$${WHITELIST}' MIN_SEARCH_LENGTH='$${MIN_SEARCH_LENGTH}'  SAA_COMPLIANT_BROWSERS='$${SAA_COMPLIANT_BROWSERS}' PUBLIC_PATH_PREFIX=$(PUBLIC_PATH_PREFIX) webpack --config webpack.prod.js
	@rm -rf dist-pre/$(VERSION)
	@mkdir -p dist-pre/$(VERSION)
	@mv dist/* dist-pre/$(VERSION)/

bundle:
	env BASE_URL=$(BASE_URL) COMPONENT_URL=$(BASE_URL)cta/ MDQ_URL=$(MDQ_URL) PERSISTENCE_URL=$(BASE_URL)ps/ SEARCH_URL=$(SEARCH_URL) STORAGE_DOMAIN=$(STORAGE_DOMAIN) LOGLEVEL=$(LOGLEVEL) DEFAULT_CONTEXT=$(DEFAULT_CONTEXT) MIN_SEARCH_LENGTH=$(MIN_SEARCH_LENGTH) SAA_COMPLIANT_BROWSERS=$(SAA_COMPLIANT_BROWSERS) WHITELIST=netlify.app,build.thiss.io bash ./scripts/subst-vars.sh dist-pre out

standalone: standalone_in_docker

standalone_in_docker:
	make BASE_URL='$$$${BASE_URL}' COMPONENT_URL='$$$${BASE_URL}cta/' MDQ_URL='$$$${MDQ_URL}' PERSISTENCE_URL='$$$${BASE_URL}ps/' SEARCH_URL='$$$${SEARCH_URL}' STORAGE_DOMAIN='$$$${STORAGE_DOMAIN}' LOGLEVEL='$$$${LOGLEVEL}' DEFAULT_CONTEXT='$$$${DEFAULT_CONTEXT}' WHITELIST='$$$${WHITELIST}' MIN_SEARCH_LENGTH='$$$${MIN_SEARCH_LENGTH}' SAA_COMPLIANT_BROWSERS='$$$${SAA_COMPLIANT_BROWSERS}' build_in_docker

netlify: test snyk
	env BASE_URL=$(BASE_URL) COMPONENT_URL=$(BASE_URL)cta/ MDQ_URL=$(MDQ_URL) PERSISTENCE_URL=$(BASE_URL)ps/ SEARCH_URL=$(SEARCH_URL) STORAGE_DOMAIN=$(STORAGE_DOMAIN) LOGLEVEL=$(LOGLEVEL) DEFAULT_CONTEXT=$(DEFAULT_CONTEXT) MIN_SEARCH_LENGTH=$(MIN_SEARCH_LENGTH) SAA_COMPLIANT_BROWSERS=$(SAA_COMPLIANT_BROWSERS) WHITELIST=netlify.app,build.thiss.io webpack --config webpack.prod.js

sameserver:
	make BASE_URL='/' COMPONENT_URL='/cta/' MDQ_URL='/entities/' PERSISTENCE_URL='/ps/' SEARCH_URL='/api/search' STORAGE_DOMAIN='/' LOGLEVEL='error' DEFAULT_CONTEXT='thiss.io' SAA_COMPLIANT_BROWSERS=$(SAA_COMPLIANT_BROWSERS) build

tests:
	@npm run test

cover:
	@npm run cover

setup:
	@npm ci

docker: docker_build

docker_build:
	docker build --build-arg PRE_RELEASE=$(PRE_RELEASE) --build-arg PREV_VERSION=$(PREV_VERSION) --build-arg VERSION=$(VERSION) --no-cache=true -t $(NAME):$(VERSION) .

docker_push_sunet:
	docker tag $(NAME):$(VERSION) $(REGISTRY)/$(NAME):$(VERSION)
	docker push $(REGISTRY)/$(NAME):$(VERSION)

thiss_builder:
	docker build -t thiss-builder:$(VERSION) -f Dockerfile.build .
