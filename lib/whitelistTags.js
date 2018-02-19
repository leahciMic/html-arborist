const _ = require('lodash/fp');
const HElementNode = require('../HOM/HElementNode');

module.exports = _.curry(({ allowedTags, method = 'remove' }) => (node) => {
  if (node instanceof HElementNode) {
    if (!allowedTags.includes(node.tagName)) {
      if (method === 'remove') {
        node.parent.removeChild(node);
      } else if (method === 'uplift') {
        const { id, name } = node.getAttributes();

        if (id || name) {
          const anchor = new HElementNode({
            tagName: 'a',
            attributes: { id, name },
          });
          node.parent.insertBefore(anchor, node);
        }
        node.children.forEach(child => node.parent.insertBefore(child, node));
        node.parent.removeChild(node);
      }
    }
  }
});
