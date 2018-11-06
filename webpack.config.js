const webpack = require("webpack");
const ngcWebpack = require("ngc-webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackDashboard = require('webpack-dashboard/plugin');
const path = require("path");
const dist = path.resolve(__dirname, 'dist');

module.exports = function(env, argv) {
  return {
    mode: env.production ? 'production' : 'development',

    entry: {
      polyfills: "./src/polyfills.ts",
      app: "./src/main.ts",
      chart: "./node_modules/chart.js/dist/Chart.js"
    },

    target: "web",

    devtool: env.production ? false : "inline-source-map",

    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: "/",
      filename: "[name]-[contenthash].js"
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
          exclude: path.resolve(__dirname, 'src/index.html'),
          use: ["raw-loader"]
        },

        {
          test: /\.(sass|scss|css)$/,
          include: path.resolve(__dirname, 'src/app'),
          use: ["raw-loader", "sass-loader"]
        },

        {
          test: /\.(sass|scss|css)$/,
          exclude: path.resolve(__dirname, 'src/app'),
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        },

        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file-loader?name=assets/[name].[hash].[ext]'
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new WebpackDashboard(),
      //new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: 'index html',
        template: path.resolve(__dirname, 'src/index.html')
      }),
      new ngcWebpack.NgcWebpackPlugin({
        tsConfigPath: "./tsconfig.json",
        mainPath: "./src/main.ts"
      }),

      new MiniCssExtractPlugin({
        filename: "app-[contenthash].css"
      }),

      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'src/index.html'), to: path.resolve(__dirname, 'dist/index.html')
        }, {
          from: path.resolve(__dirname, 'src/assets'), to: path.resolve(__dirname, 'dist/assets')
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
