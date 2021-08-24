const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
let package = require("./package.json");

function modify(buffer) {
  var manifest = JSON.parse(buffer.toString());
  manifest.version = package.version;
  manifest_JSON = JSON.stringify(manifest, null, 2);
  return manifest_JSON;
}

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  mode: "production",
  entry: {
    main: "./src/index.js",
  },
  devtool: "inline-source-map",
  devServer: {
    // quiet: true, //errors or warnings from webpack are not visible.
    // stats: "errors-only", //some bundle information, but not all of it
    // watchContentBase: true, // file changes will trigger a full page reload.
    hot: true,
    https: true,
    noInfo: true,
    clientLogLevel: "silent",
    contentBase: path.join(__dirname, "./dist"),
    publicPath: "/",
    historyApiFallback: true,
    compress: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    // proxy: {
    //   "/": {
    //     target: "https://doctor.clirnet.com/knowledge/rnv11/",
    //     secure: true,
    //     changeOrigin: true,
    //   },
    // },
    port: process.env.PORT || 8080, // Port Number
    // host: 'localhost', // Change to '0.0.0.0' for external facing server  //https://developer.clirnet.com/knowledge/rnv11/
  },
  externals: {
    config: JSON.stringify({
      apiUrl: "/",
    }),
  },
  output: {
    filename: "js/[name].[fullhash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "", //https://appcdn.clirnet.com/20210721/
    chunkFilename: "js/[name].[fullhash].js",
  },
  optimization: {
    emitOnErrors: false, //runtime error emits
    runtimeChunk: "single",
    moduleIds: "named", //natural	Numeric ids in order of usage.
    //named	Readable ids for better debugging.
    //deterministic	Module names are hashed into small numeric values.
    //size	Numeric ids focused on minimal initial download size.
    chunkIds: "named",
    mangleWasmImports: true, //to reduce the size of WASM by changing imports to shorter strings
    removeAvailableModules: true, //remove modules from chunks when these modules are already included in all parents
    removeEmptyChunks: false, //remove chunks which are empty
    mergeDuplicateChunks: false, //merge chunks which contain the same modules
    innerGraph: false, //  conduct inner graph analysis for unused exports
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      node_modules: path.join(__dirname, "node_modules"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      //   {
      //     test: /\.json$/,
      //     loader: 'file-loader',
      //     type: 'javascript/auto',
      //     exclude: /node_modules/,
      //     options: {
      //         name: 'static/json/[name].[hash:8].[ext]'
      //     }
      // },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // inject CSS to page
            loader: "style-loader",
          },
          {
            // translates CSS into CommonJS modules
            loader: "css-loader",
          },
          {
            // Run postcss actions
            loader: "postcss-loader",
            options: {
              // `postcssOptions` is needed for postcss 8.x;
              // if you use postcss 7.x skip the key
              postcssOptions: {
                // postcss plugins, can be exported to postcss.config.js
                plugins: function () {
                  return [require("autoprefixer")];
                },
              },
            },
          },
          {
            // compiles Sass to CSS
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.pdf$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[fullhash].[ext]",
            outputpath: "pdf",
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              type: "asset",
              // name: "[name].[fullhash].[ext]",
              outputPath: "images",
            },
          },
        ],
      },
      {
        test: /bootstrap\/dist\/js\/umd\//,
        use: "imports-loader?jQuery=jquery,$=jquery,this=>window",
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[fullhash].[ext]",
              outputPath: "/fonts",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/index.html",
      filename: "index.html",
      // favicon: "./src/images/favicon.ico",
      // manifest: "./public/manifest.json",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    }),

    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[name].[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./public/favicon.ico", to: "images" },
        // {
        //   from: "./public/manifest.json",
        //   to: "manifest.json",
        //   transform(content, path) {
        //     return modify(content);
        //   },
        // },
      ],
    }),
    new CompressionPlugin(),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["jpegtran", { progressive: true }],
          ["optipng", { optimizationLevel: 5 }],
        ],
      },
    }),
    // new WorkboxPlugin.GenerateSW({
    //   clientsClaim: true,
    //    skipWaiting: true
    //  }),
  ],
};
