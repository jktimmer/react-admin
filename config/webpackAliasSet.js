// 设置别名 set webpack alias
// when use ide tip, can add this alis into jsconfig.json
const path = require('path')
const paths = require('./paths');

const resolvePath = (namePath) => path.resolve(paths.appSrc, namePath)
module.exports = {
    '@': resolvePath('./'),
    '@api': resolvePath('./api'),
    '@assets': resolvePath('./assets'),
    '@components': resolvePath('./components'),
    '@configs': resolvePath('./configs'),
    '@pages': resolvePath('./pages'),
    '@routes': resolvePath('./routes'),
    '@style': resolvePath('./style'),
    '@store': resolvePath('./store'),
    '@utils': resolvePath('./utils')
}