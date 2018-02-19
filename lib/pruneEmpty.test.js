const transformHOM = require('./transformHOM');
const pruneEmpty = require('./pruneEmpty');
const H$ = require('../HOM/HOMBuilder');

const transform = transformHOM(pruneEmpty);

test('prune empty', () => {
  expect(transform(H$('<div>hello<span></span></div>')).toString()).toBe('<div>hello</div>');
});

test('prune empty, should be able to remove recursively', () => {
  expect(transform(H$('<div><span><b></b></span></div>')).toString()).toBe('');
});
