const transformHOM = require('./transformHOM');
const removeUnsafeAnchors = require('./removeUnsafeAnchors');
const H$ = require('../HOM/HOMBuilder');

const transform = transformHOM(removeUnsafeAnchors);

test('Remove unsafe anchors', () => {
  const html = '<a href="javascript:alert(\'hi\')">hello</a>';
  expect(transform(H$(html)).toString()).toBe('');
});

test('Do not remove safe anchors', () => {
  const html = '<a href="https://example.com">hello</a>';
  expect(transform(H$(html)).toString()).toBe(html);
});

