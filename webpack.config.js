const path = require("path")

const PATHS = require("./config/paths")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: path.resolve(PATHS.ROOTS.SRC, "main.js"),
  resolve: {
    alias: {
      components: path.resolve(PATHS.ROOTS.SRC, "components"),
      images: path.resolve(PATHS.ROOTS.SRC, "images"),
      utilities: path.resolve(PATHS.ROOTS.SRC, "utilities")
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(js)$/i,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(PATHS.ROOTS.SRC, "templates", "index.html")
    })
  ],
  output: {
    clean: true,
    filename: "[name].[contenthash].js",
    path: PATHS.ROOTS.PUBLIC
  }
}
