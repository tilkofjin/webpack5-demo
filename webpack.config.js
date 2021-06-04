// webpack.config.js
const path = require('path');
// 从模板生成一个HTML文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 打包前清除dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 命令行友好提示
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// 将css独立成文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: './src/app.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: ['.js', '.tsx', '.json', '.css', '.scss'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    // eslint-disable-next-line new-cap
    new friendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '问卷调查系统',
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
      // 压缩
      minify: {
        collapseWhitespace: true, // 删除空格
        removeComments: true, // 移除注释
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, './dist'),
    open: false,
    hot: true,
    quiet: true,
    port: 8082,
  },
  optimization: {
    usedExports: true, // 识别无用代码
    minimize: true, // 将无用代码在打包中删除
    concatenateModules: true, // 尽可能将所有模块合并输出到一个函数中
    minimizer: [
      new TerserPlugin({
        extractComments: false, // 不将注释提取到单独的文件中
      }),
    ],
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.m?(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // TypeScript
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require.resolve('tailwindcss')],
              },
            },
          },
        ],
      },
    ],
  },
};
