const { BaseAutoImportPlugin } = require("./BaseAutoImportPlugin");

class WebpackAutoImportPlugin extends BaseAutoImportPlugin {
  apply(compiler) {
    compiler
      .hooks
      .compilation
      .tap(this.constructor.name, (compilation) =>
        compilation
          .hooks
          .optimizeChunkAssets
          .tapAsync(this.constructor.name, this._optimizeChunkAssets.bind(this, compilation)));
  }
}

module.exports = WebpackAutoImportPlugin;
