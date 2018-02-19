const _ = require('lodash/fp');
const HElementNode = require('../HOM/HElementNode');
const walkHOM = require('./walkHOM');
const transformHOM = require('./transformHOM');

const trimAttrs = _.compose(_.mapValues(_.trim), _.pick(['id', 'name', 'href']));

module.exports = _.curry((fragmentPrefix, root) => {
  const collectIds = [];
  const collectFragments = [];
  const collectNames = [];

  walkHOM(root, (node) => {
    if (node instanceof HElementNode) {
      const { id, name, href } = trimAttrs(node.getAttributes());

      if (id) { collectIds.push(id); }
      if (name) { collectNames.push(name); }
      if (href) {
        const match = href.trim().match(/^#(.*)/);
        if (match) { collectFragments.push(match[1]); }
      }
    }
  });

  const validFragments = _.intersection(collectFragments, collectIds.concat(collectNames));

  return transformHOM((node) => {
    if (node instanceof HElementNode) {
      const { id, name, href } = trimAttrs(node.getAttributes());

      if (id) {
        if (!validFragments.includes(id)) {
          node.removeAttribute('id');
        } else {
          node.setAttribute('id', `${fragmentPrefix}${validFragments.indexOf(id) + 1}`);
        }
      }

      if (name) {
        if (name && !validFragments.includes(name)) {
          node.removeAttribute('name');
        } else {
          node.setAttribute('name', `${fragmentPrefix}${validFragments.indexOf(name) + 1}`);
        }
      }

      if (href) {
        if (href.trim().startsWith('#')) {
          const fragment = href.trim().substr(1);

          if (!validFragments.includes(fragment)) {
            node.parent.removeChild(node);
            return undefined;
          }

          node.setAttribute('href', `#${fragmentPrefix}${validFragments.indexOf(fragment) + 1}`);
        }
      }
    }
    return node;
  }, root);
});
