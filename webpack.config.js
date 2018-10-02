const webpack = require("webpack");
const ngcWebpack = require("ngc-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackDashboard = require('webpack-dashboard/plugin');
const path = require("path");
const _root = path.resolve(__dirname, ".");

function getRoot(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

module.exports = function(env, argv) {
  return {
    mode: env.production ? 'production' : 'development',

    entry: {
      chart: "./node_modules/chart.js/dist/Chart.js",
      app: "./src/main.ts",
      polyfills: "./src/polyfills.ts"
    },

    target: "web",

    devtool: env.production ? false : "inline-source-map",

    output: {
      path: getRoot("dist"),
      publicPath: "/",
      filename: "[name].js"
    },

    resolve: {
      extensions: [".js", ".ts", ".html"]
    },

    module: {
      rules: [{
          test: /\.ts?$/,
          enforce: 'pre',
          loader: 'tslint-loader',
          options: {
            configFile: './tslint.json'
          }
        },
        {
          test: /.js$/,
          parser: {
            system: true
          }
        },
        // Typescript
        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          exclude: /node_modules/,
          use: [ '@ngtools/webpack']
        },
        // Templates
        {
          test: /\.html$/,
          exclude: getRoot("src", "index.html"),
          use: ["raw-loader"]
        },

        {
          test: /\.(sass|scss|css)$/,
          include: getRoot("src", "app"),
          use: ["raw-loader", "sass-loader"]
        },

        {
          test: /\.(sass|scss|css)$/,
          exclude: getRoot("src", "app"),
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        },

        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file-loader?name=assets/[name].[hash].[ext]'
        },
      ]
    },
    plugins: [
      new WebpackDashboard(),
      //new webpack.HotModuleReplacementPlugin(),
      new ngcWebpack.NgcWebpackPlugin({
        tsConfigPath: "./tsconfig.json",
        mainPath: "./src/main.ts"
      }),

      new MiniCssExtractPlugin({
        filename: "app.css"
      }),

      new CopyWebpackPlugin([
        {
          from: getRoot("src", "index.html"), to: getRoot("dist", "index.html")
        },
        {
          from: getRoot("src", "assets"), to: getRoot("dist", "assets")
        }
      ])
    ],
    devServer: {
      host: 'localhost',
      historyApiFallback: true,
      //hot: true,
      noInfo: true,
      open: true,
      inline: true
    },
  };
};
