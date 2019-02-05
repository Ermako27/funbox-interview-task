const path = require('path');
const CleanWebPackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode : 'production',

    entry : {
        main : './src/app.js'
    },

	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
    },
    
    module : {
        rules : [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ] 
    },

    plugins : [
        new CleanWebPackPlugin(['dist'])
    ]
}