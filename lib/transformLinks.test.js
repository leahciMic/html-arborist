const transformLinks = require('./transformLinks');
const H$ = require('../HOM/HOMBuilder');
const transformHOM = require('./transformHOM');

test('transforms img src', () => {
  const html = '<img src="bar.jpg" />';
  const transform = transformLinks('http://example.com/foo');
  expect(transformHOM(transform, H$(html)).toString())
    .toBe('<img src="http://example.com/bar.jpg"></img>');
});

test('transforms anchor href', () => {
  const html = '<a href="bar">foo</a>';
  const transform = transformLinks('http://example.com/foo/');
  expect(transformHOM(transform, H$(html)).toString())
    .toBe('<a href="http://example.com/foo/bar">foo</a>');
});

test('does not touch absolute urls', () => {
  const html = '<a href="https://google.com">foo</a>';
  const transform = transformLinks('');
  expect(transformHOM(transform, H$(html)).toString())
    .toBe(html);
});

test('does not touch data urls', () => {
  const html = '<a href="data:">foo</a>';
  const transform = transformLinks('');
  expect(transformHOM(transform, H$(html)).toString()).toBe(html);
});
