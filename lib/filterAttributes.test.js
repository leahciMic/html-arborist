const transformHOM = require('./transformHOM');
const filterAttributes = require('./filterAttributes');
const H$ = require('../HOM/HOMBuilder');

const html = '<div id="foo"></div><p src="data:"></p>';

test('filtering attributes by tag should work', () => {
  const transform = filterAttributes((tagName, key, value) => {
    if (tagName === 'div') {
      return undefined;
    }
    return value;
  });
  expect(transformHOM(transform, H$(html)).toString()).toBe('<div></div><p src="data:"></p>');
});

test('filtering attributes by key should work', () => {
  const transform = filterAttributes((tagName, key, value) => {
    if (key === 'src') {
      return 'foobar';
    }
    return value;
  });
  expect(transformHOM(transform, H$(html)).toString())
    .toBe('<div id="foo"></div><p src="foobar"></p>');
});
