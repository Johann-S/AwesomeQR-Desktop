const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: __dirname + '/app',
    publicPath: './',
    filename: 'bundle.js'
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
			{
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ]
      }
    ],
	},
	plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
}