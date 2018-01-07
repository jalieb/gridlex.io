var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var extractSass = new ExtractTextPlugin({
    filename: 'css/style.css'
});


var browserSync = new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    server: { baseDir: ['.'] },
    files: './index.html'
});

var uglifyJs = new UglifyJsPlugin({
    test: /\.js$/,
    exclude: /\node_modules/
});

module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '.'
    },
    entry: './src/index.js',
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMaps: true,
                            minimize: true
                        }
                    },{
                        loader: "sass-loader",
                        options: {
                            sourceMaps: true
                        }
                    }],
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        extractSass,
        browserSync,
        uglifyJs
    ]
};
