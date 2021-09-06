const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  resolve: {
    extensions: [ ".ts", ".js" ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
      minimize: false
  },
  watchOptions: {
    ignored: "**/node_modules",
  }
};
