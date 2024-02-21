import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

export default {
  // Entry point of the application
  entry: "./src/index.ts",

  // Output configuration
  output: {
    path: path.resolve(dirName, "dist"),
    filename: "bundle.js",
  },

  // Specify file resolutions
  resolve: {
    extensions: [".ts", ".js"],
  },

  // Module rules configuration
  module: {
    rules: [
      // TypeScript files handling
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // CSS files handling
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  // Plugins configuration
  plugins: [
    // Generates an HTML file with the <script> injected.
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

    // Copies files or directories to the build directory.
    new CopyWebpackPlugin({
      patterns: [{ from: "src/assets", to: "assets" }],
    }),
  ],

  // Development server configuration
  devServer: {
    static: path.join(dirName, "dist"),
    liveReload: true,
    compress: true,
    port: 9000,
  },
};
