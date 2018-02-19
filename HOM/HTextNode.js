const HNode = require('./HNode');
const encodeEntities = require('../lib/encodeEntities');

const privates = new WeakMap();

function transformPrivate(context, transform) {
  privates.set(context, transform(privates.get(context)));
}

module.exports = class HTextNode extends HNode {
  constructor({ textContent = '', ...rest } = {}) {
    super({ ...rest });
    privates.set(this, {});
    this.textContent = textContent;
  }
  clone() {
    return new HTextNode({ textContent: this.textContent });
  }
  get textContent() {
    return privates.get(this).textContent;
  }
  set textContent(textContent) {
    if (typeof textContent !== 'string') {
      throw new Error('textContent must be a string');
    }
    transformPrivate(this, data => Object.assign({}, data, { textContent }));
  }
  toString() {
    return encodeEntities(privates.get(this).textContent);
  }
  // eslint-disable-next-line class-methods-use-this
  appendChild() {
    throw new Error('HTextNode cannot have children');
  }
};
