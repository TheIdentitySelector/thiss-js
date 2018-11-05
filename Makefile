all:
	@npm run build
start:
	@npm run start
clean:
	@rm -rf dist

BABEL_MODULES=babel-loader @babel/core @babel/preset-env @babel/polyfill
WEBPACK_MODULES=webpack webpack-cli webpack-merge style-loader css-loader svg-inline-loader \
  extract-text-webpack-plugin html-webpack-plugin clean-webpack-plugin webpack-dev-server \
  file-loader html-loader handlebars-loader
SRC_MODULES=handlebars zoid
ICON_MODULES=webpack-icons-installer

setup:
	@npm install --save-dev $(SRC_MODULES) $(BABEL_MODULES) $(WEBPACK_MODULES) $(ICON_MODULES)
