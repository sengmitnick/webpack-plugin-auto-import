# `@vidazoo/webpack-ast-traversal-plugin-core`

> TODO: description

## Usage

### Taro

config/index.js

```js
module.exports = {
  // ...
  mini: {
    // ...
    webpackChain(chain, webpack) {
      chain.merge({
        plugin: {
          install: {
            plugin: require("webpack-plugin-auto-import"),
            args: [
              {
                entry: []
                callExpressions: [
                  { identifier: "*.console.*", action: "warn" },
                ],
              },
            ],
          },
        },
      });
    },
  },
};
```
