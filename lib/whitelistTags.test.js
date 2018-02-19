const transformHOM = require('./transformHOM');
const whitelistTags = require('./whitelistTags');
const H$ = require('../HOM/HOMBuilder');

const onlyB = whitelistTags({ allowedTags: ['b'], method: 'remove' });

test('filters out tags not in the whitelist', () => {
  const html = '<a>hello</a><b>bye</b><i>foo</i>';
  expect(transformHOM(onlyB, H$(html)).toString()).toBe('<b>bye</b>');
});

test('filters out tags not in the whitelist', () => {
  const html = '<div><span><b>uplift</b></span></div>';
  const transform = whitelistTags({ allowedTags: ['div', 'b'], method: 'uplift' });
  expect(transformHOM(transform, H$(html)).toString()).toBe('<div><b>uplift</b></div>');
});

test('uplifts correctly', () => {
  const html = '<div><i>a</i><span>a<b>b</b>c</span><i>c</i></div>';
  const transform = whitelistTags({ allowedTags: ['div', 'i', 'b'], method: 'uplift' });
  expect(transformHOM(transform, H$(html)).toString()).toBe('<div><i>a</i>a<b>b</b>c<i>c</i></div>');
});
