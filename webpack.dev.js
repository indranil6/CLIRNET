const common = require('./webpack.config');
const path = require("path");
const {merge} = require('webpack-merge');

module.exports = merge(common, { 
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "dist"), // base path where to send compiled assets
    publicPath: "", // base path where referenced files will be look for
    chunkFilename:'js/[name].bundle.js'
  }
});
