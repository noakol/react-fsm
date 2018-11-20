const webpack = require('webpack');

const PATH = require('path');
const ROOT = PATH.resolve(__dirname, '../');
const PACKAGE_JSON_PATH = PATH.resolve(ROOT, 'package.json');
const PACKAGE_JSON = require(PACKAGE_JSON_PATH);
const BUNDLE_NAME = PACKAGE_JSON.name;

const SRC_FOLDER = PATH.resolve(ROOT, 'src/');
const SRC_ENTRY_FILE = PATH.resolve(SRC_FOLDER, 'index.js');
const LIB_FOLDER = PATH.resolve(ROOT, 'lib/');
const BUILD_FOLDER = PATH.resolve(ROOT, 'dist/');

const ENTRY = {};
ENTRY[BUNDLE_NAME] = SRC_ENTRY_FILE;

const PLUGINS = {

};

const RULES = [];

const babelSrcRule = {
    test: /\.js$/,
    include: [
        SRC_FOLDER
    ],
    exclude: /(node_modules)/,
    loader: 'babel-loader',
    options: {
        compact: false,
        cacheDirectory: true,
        babelrc: false,
        presets: ['env', 'react'],
        plugins: [
            'transform-decorators-legacy',
            'transform-object-rest-spread'
        ]
    }
};

const babelLibsRule = {
    test: /\.js$/,
    include: [
        LIB_FOLDER
    ],
    exclude: [
        SRC_FOLDER
    ],
    loader: 'babel-loader',
    options: {
        compact: false,
        cacheDirectory: true,
        babelrc: false,
        presets: ['env', 'react'],
        plugins: [
            'transform-decorators-legacy',
            'transform-object-rest-spread'
        ]
    }
};

RULES.push(babelSrcRule);
RULES.push(babelLibsRule);


module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        library: '[name]',
        libraryTarget: 'umd',
        path: ROOT + '/dist',
        filename: '[name].js',
    },
    externals: {
        react: {root: 'React', commonjs2: 'react', commonjs: 'react', amd: 'react'},
        'react-dom': {root: 'ReactDOM', commonjs2: 'react-dom', commonjs: 'react-dom', amd: 'react-dom'}
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            include: [
                SRC_FOLDER,
                LIB_FOLDER
            ],
            exclude: /node_modules/,
            use: ['babel-loader']
          }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
};

