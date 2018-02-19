const _ = require('lodash/fp');

const filterAttributes = require('./filterAttributes');

module.exports = _.curry(attributes =>
  filterAttributes((tagName, key, value) => {
    if (Array.isArray(attributes) && attributes.includes(key)) {
      return value;
    }
    if (attributes instanceof Object && !Array.isArray(attributes)) {
      if ((attributes['*'] || []).concat(attributes[tagName] || []).includes(key)) {
        return value;
      }
    }
    return undefined;
  }));
