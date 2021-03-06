const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebPackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode : 'development',

    watch : true,
    watchOptions : {
        ignored : /node_modules/
    },

    entry : {
        main : './src/index.js'
    },

	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
    },
    
    devtool : 'inline-source-map',

    module : {
        rules : [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ] 
    },


    plugins : [
        new CleanWebPackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "./index.html"
        })
    ]
}