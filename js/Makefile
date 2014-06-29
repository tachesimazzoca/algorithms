ARTIFACT=algorithms-js

all: build

.PHONY: build
build: node_modules bower_components checkstyle
	@install -d build/
	@rm -rf build/*
	@cp -R src/* build/.
	@install -d build/lib/underscore
	@cp bower_components/underscore/underscore-min.js build/lib/underscore/.
	@cd build/assets/js/ && cat core.js uf.js sort.js st.js > $(ARTIFACT).js
	@./node_modules/.bin/uglifyjs -nc build/assets/js/$(ARTIFACT).js > build/assets/js/$(ARTIFACT).min.js

.PHONY: checkstyle
checkstyle: node_modules
	@./node_modules/.bin/jshint src/assets/js/*.js --config src/.jshintrc
	@./node_modules/.bin/jshint src/tests/unit/*.js --config src/.jshintrc

.PHONY: docs 
docs:
	@./node_modules/.bin/yuidoc -o build/docs src/assets/js

.PHONY: clean
clean:
	@rm -rf build/
	@rm -rf node_modules/
	@rm -rf bower_components/

node_modules:
	@npm install

bower_components:
	@bower install

.PHONY: serve 
serve:
	@node server.js

