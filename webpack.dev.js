const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const extractSass = new ExtractTextPlugin("style.css");
const cleanWebpackPlugin = new CleanWebpackPlugin(["dist"]);
const htmlPlugin = new HtmlWebpackPlugin({
    template: "./index.html",
    inject: true,
    title: "React-Typescript!"
});

module.exports = [
{
    target: "node",
    mode: "development",
    entry: {
        server: "./src/server/server.ts",
        bundle: "./src/public/index.tsx"
    },
    devtool: "inline-source-map",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        cleanWebpackPlugin,
        htmlPlugin,
        extractSass,
    ],
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".scss", ".css"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            }
        ],
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
    },
},
];