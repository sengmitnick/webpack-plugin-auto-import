var path = require("path")

const config = {
  projectName: 'taro',
  date: '2021-4-20',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
//     webpackChain(chain, webpack) {
//       chain.merge({
//         plugin: {
//           install: {
//             plugin: require('webpack-plugin-auto-import'),
//             args: [{
//               entry: [path.resolve(__dirname, '..', 'src/pages/index/index.tsx')],
//               template: (exportName, children) => `
// import Container from "@/components/Container";
// ${children}

// export default Container(${exportName});`,
//               callExpressions: [{ identifier: "*.console.*", action: 'warn' }]
//             }]
//           }
//         }
//       })
//     }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
