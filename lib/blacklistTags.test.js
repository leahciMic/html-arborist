const blacklistTags = require('./blacklistTags');
const H$ = require('../HOM/HOMBuilder');
const transformHOM = require('./transformHOM');

const onlyB = blacklistTags({ tags: ['b'], method: 'remove' });

test('filters out tags in the blacklist', () => {
  const html = '<a>hello</a><b>bye</b><i>foo</i>';
  expect(transformHOM(onlyB, H$(html)).toString()).toBe('<a>hello</a><i>foo</i>');
});

test('filters out tags not in the whitelist', () => {
  const html = '<div><span><b>uplift</b></span></div>';
  expect(transformHOM(blacklistTags({ tags: ['span'], method: 'uplift' }), H$(html)).toString())
    .toBe('<div><b>uplift</b></div>');
});
