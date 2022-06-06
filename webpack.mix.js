const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
require('laravel-mix-workbox');

const { GenerateSW } = require('workbox-webpack-plugin');

mix.webpackConfig({
    plugins: [new GenerateSW()],
    output: {
        publicPath: '',
    },
});
mix.ts('resources/js/index.tsx', 'public/js/app.js').react().extract(['react']).sass('resources/sass/app.scss', 'public/css').generateSW();

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader',
                },
            },
        ],
    },
};
