const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const commonConfig = {
    node: {
        __dirname: false
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    typeCheck: true,
                    emitErrors: true
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ["es2015", "react"]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
    }
}

module.exports = [
    Object.assign(
        {
            target: 'electron-main',
            entry: './src/main.ts'
        },
        commonConfig),
    Object.assign(
        {
            target: 'electron-renderer',
            entry: { gui: './src/app/gui.tsx' },
            plugins: [new HtmlWebpackPlugin({
                template: './src/app/index.html'
            })]
        },
        commonConfig)
]