const _ = require('lodash/fp');

function cloneTree(root) {
  const newNode = root.clone();
  root.children.forEach((child) => {
    newNode.appendChild(cloneTree(child));
  });
  return newNode;
}

function flatDepthFirst(root) {
  return _.flatten([..._.map(flatDepthFirst, _.reverse(root.children)), root]);
}

module.exports = _.curry((iter, inNode) => {
  // by design iter will never be called for newly created nodes outside of the
  // initial tree. it is assumed if you're adding something to the tree it does
  // not need processing
  const node = cloneTree(inNode);
  const flatList = flatDepthFirst(node);

  flatList
    .forEach(child => iter(child));

  return node;
});

