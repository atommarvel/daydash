const path = require('path');

const mod = {
    rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['react']
                }
            }
        }
    ]
};

module.exports = {
    module: mod,
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};