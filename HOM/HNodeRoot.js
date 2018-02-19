const HNode = require('./HNode');

module.exports = class HNodeRoot extends HNode {
  constructor(...args) {
    super({ parent: null, ...args });
  }
  clone() { // eslint-disable-line class-methods-use-this
    return new HNodeRoot();
  }
};
