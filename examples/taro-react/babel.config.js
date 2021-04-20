// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
var path = require("path")

module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true
    }]
  ],
  "plugins": [
    ["./babel-plugin-auto-import", { entry: [path.resolve('src/pages/index/index.tsx')] }]
  ]
}
