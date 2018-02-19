const HNode = require('./HNode');
const encodeEntities = require('../lib/encodeEntities');
const _ = require('lodash/fp');

const cleanAttributes = _.compose(_.mapValues(_.trim), _.pickBy(_.identity));

const privates = new WeakMap();

function transformPrivate(context, transform) {
  privates.set(context, transform(privates.get(context)));
}

module.exports = class HElementNode extends HNode {
  constructor({ tagName, attributes = {}, ...rest } = {}) {
    super({ ...rest });
    if (!tagName) {
      throw new Error('HElementNode requires tagName');
    }
    privates.set(this, { tagName, attributes: {} });
    this.setAttributes(attributes);
  }
  clone() {
    return new HElementNode({
      tagName: this.tagName,
      attributes: this.getAttributes(),
    });
  }
  set tagName(tagName) {
    transformPrivate(this, data => Object.assign({}, data, { tagName }));
  }
  get tagName() {
    return privates.get(this).tagName;
  }
  getAttributes() {
    return privates.get(this).attributes;
  }
  getAttribute(key) {
    return privates.get(this).attributes[key];
  }
  setAttributes(attributes) {
    transformPrivate(this, data => Object.assign({}, data, {
      attributes: cleanAttributes(attributes),
    }));
  }
  removeAttribute(attribute) {
    const attrs = this.getAttributes();
    delete attrs[attribute];
    this.setAttributes(attrs);
  }
  setAttribute(key, rawValue) {
    const value = _.trim(rawValue);

    if (!value) {
      this.removeAttribute(key);
      return;
    }

    transformPrivate(this, data => Object.assign(
      {},
      data,
      { attributes: Object.assign({}, data.attributes, { [key]: value }) },
    ));
  }
  toString() {
    const privateAttrs = this.getAttributes();
    const attrs = privateAttrs.length === 0 ? '' :
      Object.keys(privateAttrs)
        .map(key => ` ${key}="${encodeEntities(privateAttrs[key])}"`)
        .join('');

    const childrenHtml = this.children.reduce((html, node) => `${html}${node}`, '');

    return `<${this.tagName}${attrs}>${childrenHtml}</${this.tagName}>`;
  }
};
