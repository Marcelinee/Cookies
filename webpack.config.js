module.exports = {
    entry: "./src/page.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    module: {
         rules: [{
             loader: 'babel-loader',
             test: /\.js$/,
             exclude: /node_modules/
         }, {
             test: /\.s?css$/,
             use: [
                 'style-loader',
                 'css-loader',
                 'sass-loader'
             ]
         }]
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: __dirname + "/public"
    }
};