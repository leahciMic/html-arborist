const _ = require('lodash/fp');
const HElementNode = require('../HOM/HElementNode');

module.exports = _.curry(({ tags, method = 'remove' }) => (node) => {
  if (node instanceof HElementNode) {
    if (tags.includes(node.tagName)) {
      if (method === 'remove') {
        node.parent.removeChild(node);
      } else if (method === 'uplift') {
        node.children.forEach(child => node.parent.insertBefore(child, node));
        node.parent.removeChild(node);
        return undefined;
      }
    }
  }

  return node;
});
