const rewriteFragments = require('./rewriteFragments');
const H$ = require('../HOM/HOMBuilder');


test('rewrites fragments', () => {
  const html = '<p id="test">foo</p><a href="#foo">hello</a><div id="foo">bar</div><a href="#test">test</a>';
  const expectedHtml = '<p id="ha-internal-1">foo</p><a href="#ha-internal-2">' +
    'hello</a><div id="ha-internal-2">bar</div><a href="#ha-internal-1">test</a>';
  expect(rewriteFragments('ha-internal-', H$(html)).toString(html)).toBe(expectedHtml);
});

test('removes invalid links', () => {
  const html = '<a href="#missing">foo</a>';
  expect(rewriteFragments('ha-internal-', H$(html)).toString()).toBe('');
});

test('ignores space in ids', () => {
  const html = '<a href="#foo"></a><div id=" foo "></div>';
  expect(rewriteFragments('h', H$(html)).toString()).toBe('<a href="#h1"></a><div id="h1"></div>');
});

test('removes unmatched ids', () => {
  const html = '<div id="noMatch"></div>';
  expect(rewriteFragments('h', H$(html)).toString()).toBe('<div></div>');
});

test('ignores space in names', () => {
  const html = '<a href="#foo"></a><div name=" foo "></div>';
  expect(rewriteFragments('h', H$(html)).toString()).toBe('<a href="#h1"></a><div name="h1"></div>');
});

test('removes unmatched names', () => {
  const html = '<div name="noMatch"></div>';
  expect(rewriteFragments('h', H$(html)).toString()).toBe('<div></div>');
});
