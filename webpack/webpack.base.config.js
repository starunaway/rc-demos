const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
    vendor: ['react', 'react-dom', 'react-router-dom'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', 'jsx'],
    mainFiles: ['index'],
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@constants': path.resolve(__dirname, '../src/constants'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@router': path.resolve(__dirname, '../src/router'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',

          {
            loader: 'postcss-loader', // 用于给css加前缀
            options: {
              plugins: [require('autoprefixer')],
            },
          },
        ],
      },
      {
        test: /\.(less)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader', // 用于给css加前缀
            options: {
              plugins: [require('autoprefixer')],
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CleanWebpackPlugin(),
  ],

  optimization: {
    splitChunks: {
      chunks: 'async', // 默认按需加载的时候才会优化
      minSize: 30000, // 模块大小，字节数
      maxSize: 0,
      minChunks: 1, // 模块最小引用次数
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendor: {
          chunks: 'initial',
          minSize: 0,
          minChunks: 2, //
          enforce: true,
          name: 'common/vendor',
        },
      },
    },
    runtimeChunk: {
      name: 'manifest', // 防止缓存失效，将webpack运行文件抽离出来
    },
  },
};
