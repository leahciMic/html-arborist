const transformHOM = require('./transformHOM');

const whitelistAttributes = require('./whitelistAttributes');
const H$ = require('../HOM/HOMBuilder');

const onlyHref = whitelistAttributes(['href']);

test('filters out attributes not in the whitelist', () => {
  const html = '<a href="foo" bar="baz">hello</a>';
  expect(transformHOM(onlyHref, H$(html)).toString()).toBe('<a href="foo">hello</a>');
});

test('can specify attributes per tag', () => {
  const html = '<a href="foo" bar="baz">hello</a><i foo="bar" baz="qux"></i>';
  const transform = whitelistAttributes({
    a: ['href'],
    i: ['foo'],
  });
  expect(transformHOM(transform, H$(html)).toString())
    .toBe('<a href="foo">hello</a><i foo="bar"></i>');
});

test('can specify wildcard tag', () => {
  const html = '<a id="1" href="foo" bar="baz">hello</a><i id="2" foo="bar" baz="qux"></i>';
  const transform = whitelistAttributes({
    '*': ['id'],
    a: ['href'],
    i: ['foo'],
    // note: wildcard attributes will be picked first
  });
  expect(transformHOM(transform, H$(html)).toString())
    .toBe('<a id="1" href="foo">hello</a><i id="2" foo="bar"></i>');
});
