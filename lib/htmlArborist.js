const _ = require('lodash/fp');
const H$ = require('../HOM/HOMBuilder');

const transformHom = require('./transformHOM');
const allowedAttributes = require('./allowedAttrs');

const removeUnsafeAnchors = require('./removeUnsafeAnchors');
const whitelistAttributes = require('./whitelistAttributes');
const whitelistTags = require('./whitelistTags');
const blacklistTags = require('./blacklistTags');
const relevelHeadings = require('./relevelHeadings');
const rewriteFragments = require('./rewriteFragments');
const transformLinks = require('./transformLinks');
const filterAttributes = require('./filterAttributes');
const pruneEmpty = require('./pruneEmpty');

const recognizeTags = [
  'p', 'b', 'i', 'strong', 'em', 'ul', 'ol', 'li', 'pre', 'img', 'a',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'article', 'section', 'main', 'section', 'summary', 'time', 'details',
  // 'div',
  'table', 'tr', 'th', 'td', 'tbody', 'thead',
  'dd', 'dl', 'abbrev', 'address', 'blockquote', 'br', 'hr', 'code', 'cite',
  'del', 'kbd', 'legend', 'small', 'sub', 'sup',
];

module.exports = function htmlArborist(html, baseURL) {
  const middleware = [];
  function use(fn) {
    middleware.push(fn);
  }

  function processMiddleware(hom) {
    return transformHom((node) => {
      middleware.forEach((fn) => {
        // do not process detached nodes
        if (!node.parent) {
          return;
        }
        fn(node);
      });
    }, hom);
  }

  use(whitelistAttributes(allowedAttributes));
  use(blacklistTags({ tags: ['script', 'style', 'meta', 'title', 'noscript', 'link', 'head'] }));
  use(whitelistTags({ allowedTags: recognizeTags, method: 'uplift' }));
  use(transformLinks(baseURL));
  use(removeUnsafeAnchors);
  use(filterAttributes((tagName, key, value) =>
    (tagName === 'a' && key === 'href' && value.startsWith('data:') ? undefined : value)));
  use(filterAttributes((tagName, key, value) =>
    (tagName === 'img' && key === 'src' && value.startsWith('data:') ? undefined : value)));
  use(pruneEmpty);

  const sanitize = _.compose(
    processMiddleware,
    relevelHeadings(2),
    rewriteFragments('ha-internal-'),
  );

  const root = H$(html);
  return sanitize(root).toString();
};
