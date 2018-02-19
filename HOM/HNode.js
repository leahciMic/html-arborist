module.exports = class HNode {
  constructor({ children = [], parent = null } = {}) {
    // @todo check all children are HNode's
    this.children = children;
    this.parent = parent;
  }
  get lastChild() {
    return this.children[this.children.length - 1] || null;
  }
  get firstChild() {
    return this.children[0] || null;
  }
  get previousSibling() {
    if (this.parent === null) {
      return null;
    }
    return this.parent.firstChild === this ? null :
      this.parent.children[this.parent.children.indexOf(this) - 1];
  }
  get nextSibling() {
    if (this.parent === null) {
      return null;
    }
    return this.parent.lastChild === this ?
      null : this.parent.children[this.parent.children.indexOf(this) + 1];
  }
  appendChild(node) {
    if (!(node instanceof HNode)) {
      throw new Error('node must be an instance of HNode');
    }

    this.children.push(Object.assign(node, { parent: this }));
  }
  removeChild(node) {
    Object.assign(node, { parent: null });
    this.children = this.children
      .filter(childNode => childNode !== node);
  }
  insertBefore(newNode, referenceNode) {
    const idx = this.children.indexOf(referenceNode);
    if (idx === -1) {
      throw new Error('referenceNode is not a child');
    }
    this.children.splice(idx, 0, Object.assign(newNode, { parent: this }));
  }
  replaceChild(newChild, oldChild) {
    if (!(newChild instanceof HNode)) {
      throw new Error('replacement must be an instance of HNode');
    }
    this.children = this.children
      .map(childNode =>
        (childNode === oldChild ? Object.assign(newChild, { parent: this }) : childNode));
  }
  toString() {
    return this.children.reduce((html, node) => `${html}${node}`, '');
  }
};
