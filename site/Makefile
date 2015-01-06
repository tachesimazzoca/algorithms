ARTIFACT=algorithms-site

all: build

.PHONY: build
build: node_modules
	@./node_modules/docpad/bin/docpad generate

.PHONY: clean
clean:
	@rm -rf out
	@rm -rf node_modules

node_modules:
	@npm install

.PHONY: watch
watch:
	@./node_modules/docpad/bin/docpad watch

.PHONY: serve
serve:
	@./node_modules/docpad/bin/docpad server

