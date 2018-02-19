const HElementNode = require('../HOM/HElementNode');
const HTextNode = require('../HOM/HTextNode');

const allowEmpty = ['hr', 'br', 'img'];

module.exports = (node) => {
  if (node instanceof HTextNode) {
    if (node.textContent === '') {
      return;
    }
    if (node.parent.tagName !== 'pre') {
      Object.assign(node, {
        textContent: node.textContent.replace(/\n|\r/g, ' ').replace(/\s+/g, ' '),
      });
    }
  }

  if (!(node instanceof HElementNode)) {
    return;
  }

  if (node.children.length > 0 || allowEmpty.includes(node.tagName)) {
    return;
  }

  node.parent.removeChild(node);
};
