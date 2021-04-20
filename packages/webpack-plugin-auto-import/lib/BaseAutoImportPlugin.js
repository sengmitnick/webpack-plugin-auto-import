const recast = require("recast")
    , estraverse = require("estraverse")
    , { RawSource } = require("webpack-sources")
    , expressionNodeHandlers = require("./expressionNodeHandlers")
    , { isJavaScriptAsset } = require("./utils")
    , actionType = require("./actionType")
    , ResultLogger = require("./ResultLogger");


function defaults(options) {
    return Object.assign({}, {
        entry: [],
        template: (exportName, children) => `
${children}
export default ${exportName};`,

        ignoreComment: "@ast-traversal-ignore",
        action: actionType.WARN,
        callExpressions: []
    }, options);
}

class AutoImportPlugin {

    constructor(options) {
        this.options = defaults(options);
        this.options.entry = this.options.entry.map(f => `${f}.js`)
    }

    apply(compiler) {
        throw new TypeError(`[${this.constructor.name}] apply method not implemented.`);
    }

    static get ActionType() {
        return actionType;
    }

    _run() {}

    _succeedEntry(compilation, callback) {
        const files = [];
        compilation.additionalChunkAssets.forEach((file) => files.push(file));
        console.log(files);
    }

    _optimizeChunkAssets(compilation, chunks, callback) {
        const files = [];

        chunks.forEach((chunk) => chunk.files.forEach((file) => files.push(file)));

        compilation.additionalChunkAssets.forEach((file) => files.push(file));

        const entryFiles = files.filter(file => this.options.entry.includes(file));

        console.log(files);

        const result = ResultLogger.createWithCallback(callback);

        entryFiles.forEach((filename) => this._handleCompilationAsset(compilation, filename, result));

        result.flushOutput();
    }

    _handleCompilationAsset(compilation, filename, logger) {
        if (!isJavaScriptAsset(filename)) return;

        const options = this.options
            , source = compilation.assets[filename].source()
            , sourceAst = recast.parse(source);

        let handler;

        const traversedAst = estraverse.replace(sourceAst.program, {
            enter: function (node, parent) {
                console.log(node.type);
                // if (node.type === "ExportDefaultDeclaration") {
                //     console.log(JSON(node));
                // }

                if ((handler = expressionNodeHandlers[node.type])) {

                    const results = handler.handle(node, parent, options);

                    results.forEach(({ action, result }) => {
                        switch (action) {
                            case actionType.REMOVE:
                                this.remove();

                                if (parent.type === "LogicalExpression") {
                                    parent.operator = "";
                                }

                                logger.withRemovals({ filename, result, node });
                                break;
                            case actionType.WARN:
                                logger.withWarnings({ filename, result, node });
                                break;
                            case actionType.ERROR:
                                logger.withErrors({ filename, result, node });
                                break;
                        }
                    });
                }
            }
        });

        compilation.assets[filename] = new RawSource(recast.print(traversedAst).code);
    }
}

exports.BaseAutoImportPlugin = AutoImportPlugin;
