const _ = require('lodash/fp');
const HElementNode = require('../HOM/HElementNode');

module.exports = _.curry(iter => (node) => {
  if (iter.length !== 3) {
    throw new Error('filterAttribute iter takes 3 arguments tagName, key, value');
  }

  const mapper = _.mapValues.convert({ cap: false })(_.compose(
    _.curry,
    _.rearg([0, 2, 1]),
  )(iter)(node.tagName));

  if (node instanceof HElementNode) {
    node.setAttributes(mapper(node.getAttributes()));
  }

  return node;
});
