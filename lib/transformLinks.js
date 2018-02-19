const _ = require('lodash/fp');
const HElementNode = require('../HOM/HElementNode');
const normalizeUrl = require('./normalizeUrl');

const trimAttrs = _.compose(_.mapValues(_.trim), _.pick(['src', 'href']));

module.exports = _.curry(baseURL => (node) => {
  if (node instanceof HElementNode) {
    const { src, href } = trimAttrs(node.getAttributes());
    if (src) {
      node.setAttribute('src', normalizeUrl(src, baseURL));
    }
    if (href) {
      node.setAttribute('href', normalizeUrl(href, baseURL));
    }
  }
  return node;
});
