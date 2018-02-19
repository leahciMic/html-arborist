module.exports = (node) => {
  if (node.tagName === 'a') {
    const href = node.getAttribute('href') || '';

    if (href.match(/\s*javascript/)) {
      node.parent.removeChild(node);
      return undefined;
    }
  }

  return node;
};
