const { BaseAutoImportPlugin } = require("./BaseAutoImportPlugin");

class WebpackAutoImportPlugin extends BaseAutoImportPlugin {
  apply(compiler) {

    compiler.hooks.beforeRun.tap(this.constructor.name, this._run.bind(this))

  }
}

module.exports = WebpackAutoImportPlugin;
