path = require 'path'

baseConfig =
    resolve:
        alias:
            'pmaker-lib': path.resolve __dirname, 'common', 'js'

webConfig = Object.assign {}, baseConfig,
    entry: './web/js/pmaker.js'
    output:
        path: path.resolve __dirname, 'dist'
        filename: 'pmaker-web.js'
        publicPath: '/js/'
    devServer:
        contentBase: ['web', 'test']

crxConfig = Object.assign {}, baseConfig,
    entry: './crx/js/popup.js'
    output:
        path: path.resolve __dirname, 'crx', 'js'
        filename: 'pmaker-crx.js'

module.exports = [ webConfig, crxConfig ]
