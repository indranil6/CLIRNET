const common = require('./webpack.config');
const path = require("path");
const {merge} = require('webpack-merge');

module.exports = merge(common, { 
  output: {
    filename: "js/[name].bundle.js",  
    path: path.resolve(__dirname, "dist"), // base path where to send compiled assets
    publicPath: "https://appcdn.clirnet.com/20210817/", // base path where referenced files will be look for  https://appcdn.clirnet.com/20210712/
    chunkFilename:'js/[name].bundle.[fullhash].js' 
  }
});
