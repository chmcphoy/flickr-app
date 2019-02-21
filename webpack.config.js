const path = require("path");

module.exports = {
    mode: 'development',
    entry: "./src/js/index.js",
    target: "node",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["babel-preset-env"]
                    }
                }
            }
        ]
    },
		devServer: {
				port: 8080,
				publicPath: '/public/'
	},
};


