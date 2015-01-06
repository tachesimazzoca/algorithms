ARTIFACT=algorithms-site

all: build

.PHONY: build
build: node_modules lib
	@./node_modules/docpad/bin/docpad generate

.PHONY: lib
lib: bower_components
	@install -d src/static/assets/lib/underscore-1.5.2
	@cp bower_components/underscore/underscore-min.js src/static/assets/lib/underscore-1.5.2/.
	@cp bower_components/underscore/underscore-min.map src/static/assets/lib/underscore-1.5.2/.
	@install -d src/static/assets/lib/jquery-1.11.2
	@cp bower_components/jquery/dist/jquery.min.js src/static/assets/lib/jquery-1.11.2/.
	@cp bower_components/jquery/dist/jquery.min.map src/static/assets/lib/jquery-1.11.2/.

.PHONY: dist-clean
dist-clean:
	@rm -rf out
	@rm -rf src/static/assets/lib/underscore-*
	@rm -rf src/static/assets/lib/jquery-*

.PHONY: clean
clean: dist-clean
	@rm -rf node_modules
	@rm -rf bower_components

node_modules:
	@npm install

bower_components:
	@bower install

.PHONY: watch
watch:
	@./node_modules/docpad/bin/docpad watch

.PHONY: serve
serve:
	@./node_modules/docpad/bin/docpad server

