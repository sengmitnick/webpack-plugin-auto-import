// const t = require("@babel/types");

module.exports = function ({ types: t }) {
  return {
    visitor: {
      ExportDefaultDeclaration: {
        exit(path, source) {
          const { filename, opts: { entry } } = source;
          if (!entry.includes(filename)) return;
          // const declaration = t.identifier(path.node.declaration.name)
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
          // const newNode = t.exportDefaultDeclaration(declaration)
          // console.log(JSON.stringify(newNode));
          // console.log(JSON.stringify(path.parentPath.node));
          console.log(JSON.stringify(path.node));
          path.parentPath.insertBefore(t.importDeclaration(
            [t.importDefaultSpecifier(t.identifier('Container'))],
            t.stringLiteral("@/components/Container")
          ))
          path.parentPath.skip();
          // path.replaceWith(newNode);
          // path.skip();
          // path.node = newNode;
        }

      }
    }
  }
}
