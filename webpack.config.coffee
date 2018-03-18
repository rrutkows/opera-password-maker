path = require 'path'

webConfig =
    entry: './src/web/pmaker.js'
    output:
        path: path.resolve __dirname, 'dist'
        filename: 'pmaker-web.js'
        publicPath: '/js/'
    devServer:
        contentBase: ['web', 'test']

crxConfig =
    entry: './src/crx/popup.js'
    output:
        path: path.resolve __dirname, 'crx', 'js'
        filename: 'pmaker-crx.js'

module.exports = [ webConfig, crxConfig ]
