var path = require('path');

module.exports = {
	// Since webpack 4 we will need to set in what mode webpack is running
	mode: 'development',
	// This will be the entry file for all of our React code
	entry: [
		'./client/index.jsx',
	],
	// This will be where the final bundle file will be outputed
	output: {
		path: path.join(__dirname, '/server/public/js/'),
		filename: 'bundle.js',
		publicPath: 'server/public/js/',
	},
	// Adding babel loader to compile our javascript and jsx files
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'react',
							'env',
						],
					},
				},
			},
		],
	},
	watch: true,
	resolve: {
		extensions: ['.js', '.jsx', '.scss'],
	},
};
