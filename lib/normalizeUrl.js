const Url = require('url');
const _ = require('lodash/fp');

const addProtocol = url => url.replace(/^\/\//, 'https://');

const addBaseUrl = _.curry((baseURL, rawUrl) => {
  const url = rawUrl.trim();

  if (url.match(/^https?:\/\//) || url.match(/^data:/) || url.match(/^#/)) {
    return url;
  }

  return Url.resolve(baseURL, url);
});

module.exports = function normalizeUrl(url, baseURL) {
  return _.compose(
    addBaseUrl(baseURL),
    addProtocol,
    _.trim,
  )(url);
};
