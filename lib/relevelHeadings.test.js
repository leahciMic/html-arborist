const relevelHeadings = require('./relevelHeadings');
const H$ = require('../HOM/HOMBuilder');

test('relevels headings', () => {
  const html = '<h2>foo</h2><h4>bar</h4><h6>baz</h6>';
  expect(relevelHeadings(1, H$(html)).toString(html)).toBe('<h1>foo</h1><h2>bar</h2><h3>baz</h3>');
});
