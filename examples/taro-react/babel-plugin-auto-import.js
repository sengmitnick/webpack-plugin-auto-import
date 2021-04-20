const t = require("@babel/types");

module.exports = function ({ types }) {
  return {
    visitor: {
      ExportDefaultDeclaration: {
        exit(path, source) {
          const { filename, opts: { entry } } = source;
          if (!entry.includes(filename)) return;
          const declaration = t.identifier(path.node.declaration.name)
          // const newNode = t.exportDefaultDeclaration(
          //   t.callExpression(
          //     t.memberExpression(
          //       t.callExpression(
          //         t.identifier('require'),
          //         [t.stringLiteral('@/components/Container')]
          //       ), t.identifier('default')
          //     ),
          //     [declaration]
          //   ))
          const newNode = t.exportDefaultDeclaration(declaration)
          console.log(JSON.stringify(newNode));
          // console.log(path.parentPath, newNode);
          path.replaceWith(newNode);
          path.skip();
          // path.node = newNode;
        }

      }
    }
  }
}
