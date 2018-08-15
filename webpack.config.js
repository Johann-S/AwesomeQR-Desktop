const path = require('path')

module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/app',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'app/public')
  },
  module: {
    rules: [
      {
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
      {
				test: /(\.css)$/,
				loaders: ['style-loader', 'css-loader'],
			},
    ],
	},
}