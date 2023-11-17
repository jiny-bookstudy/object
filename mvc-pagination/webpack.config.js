import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  devServer: {
    port: 8088,
    open: true,
    hot: true,
    watchFiles: './src/**/*'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/assets/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/constants', to: 'constants' } // src/constants의 모든 파일을 출력 디렉토리의 constants 폴더에 복사
      ]
    })
  ]
};
