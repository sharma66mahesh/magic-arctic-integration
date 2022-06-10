const webpack = require("webpack")

module.exports = function override(config, env) {
    // config.resolve.fallback = {
    //     ...config.resolve.fallback,
    //     stream: require.resolve("stream-browserify"),
    //     buffer: require.resolve("buffer"),
    //     crypto: require.resolve("crypto-browserify"),
    //     assert: require.resolve("assert/"),
    //     http: require.resolve("stream-http"),
    //     https: require.resolve("https-browserify"),
    //     url: require.resolve("url/"),
    //     os: require.resolve("os-browserify/browser")
    // }
    // config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"]
    // config.plugins = [
    //     ...config.plugins,
    //     new webpack.ProvidePlugin({
    //         Buffer: ["buffer", "Buffer"],
    //         process: 'process/browser'
    //     }),
    // ]

    return config
}