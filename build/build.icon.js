var fs = require('fs')
var path = require('path')
var feather = require('feather-icons')

var icons = Object.keys(feather.icons)
  .map(key => `<symbol viewBox="${feather.icons[key].attrs.viewBox}" width="${feather.icons[key].attrs.width}" height="${feather.icons[key].attrs.height}" id="${key}">${feather.icons[key].toString()}</symbol>`);

fs.writeFileSync(path.resolve(__dirname, '../static/icons.svg'), `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs>${icons.join('')}</defs></svg>`);

console.log(Object.keys(feather.icons).length + ' icon generated.')
