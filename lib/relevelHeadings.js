const transformHOM = require('./transformHOM');
const walkHOM = require('./walkHOM');
const _ = require('lodash/fp');
const HElementNode = require('../HOM/HElementNode');

function collectLevels(root) {
  const levels = [];

  walkHOM(root, (node) => {
    if (!(node instanceof HElementNode)) {
      return;
    }
    const match = node.tagName.match(/^h([1-6])$/);
    if (match) {
      levels.push(match[1]);
    }
  });

  return [...new Set(levels)].sort();
}

module.exports = _.curry((startHeadingLevel, root) => {
  const levels = collectLevels(root);

  const levelMap = {};
  for (let i = 0; i < levels.length; i += 1) {
    levelMap[`h${levels[i]}`] = `h${Math.min(6, startHeadingLevel + i)}`;
  }

  return transformHOM((node) => {
    if (node instanceof HElementNode) {
      if (levelMap[node.tagName]) {
        Object.assign(node, { tagName: levelMap[node.tagName] });
      }
    }
    return node;
  }, root);
});
