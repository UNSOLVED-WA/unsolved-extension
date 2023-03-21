const os = require('os');
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  watch: false,
  entry: {
    popup: path.resolve('src/popup/main_popup.tsx'),
    background: path.resolve('src/background/background.ts'),
    contentScript: path.resolve('src/contentScript/main.tsx'),
    autoScoring: path.resolve('src/contentScript_autoScoring/autoScoring.ts'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        sideEffects: true,
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/static'),
          to: path.resolve('dist'),
        },
      ],
    }),
    ...getHtmlPlugins(['popup']),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.EnvironmentPlugin({
      BRANCH_NAME: 'main',
    }),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        parallel: os.cpus().length - 1,
      }),
    ],
    splitChunks: {
      chunks(chunk) {
        return chunk.name !== 'contentScript' && chunk.name !== 'background' && chunk.name !== 'autoScoring' && chunk.name !== 'popup';
      },
    },
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlPlugin({
        title: 'Unsolved.wa',
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}
