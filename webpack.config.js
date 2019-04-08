var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = process.env.NODE_ENV === 'production';

var config = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'docs')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Daftacademy Homework nr 3'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    isProduction
                        ? MiniCssExtractPlugin.loader
                        : { loader: 'style-loader', options: { sourceMap: true } },
                    { loader: 'css-loader', options: { sourceMap: isProduction } },
                    { loader: 'postcss-loader', options: { sourceMap: isProduction } },
                    { loader: 'sass-loader', options: { sourceMap: isProduction } }
                ]
            }
        ]
    },
    watch: true
};

module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    return config;
};