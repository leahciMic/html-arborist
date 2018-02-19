module.exports = function walkHom(node, iter) {
  iter(node);

  node.children
    .forEach(childNode => walkHom(childNode, iter));
};

