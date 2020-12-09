const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
module.exports = {
  mode: "development", //production or development
  entry: './src/main.ts',
  devtool: 'inline-source-map',//生成js source map
  externals: {  
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devServer: {
    contentBase: './dist' //告诉服务器从哪里提供内容
    ,publicPath:"/" //生成的静态文件所在的位置（若是devServer里面的publicPath没有设置，则会认为是output里面设置的publicPath的值）
  },
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),//自动清理dist目录
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      title: 'EJun Configuration template！',
      filename: 'index.html',
      template: 'src/assets/index.html'
    })//根据模板生成对应的dist内容
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  }
};