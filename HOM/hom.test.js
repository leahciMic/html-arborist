const HOMBuilder = require('./HOMBuilder.js');

test('toString() should produce correct html', async () => {
  const html = '<p>html is cool</p>';
  const hom = HOMBuilder(html);
  expect(hom.toString()).toBe(html);
});

test('should encode entities', async () => {
  const hom = HOMBuilder('<p foo="&">foobar&</p>');
  expect(hom.toString()).toBe('<p foo="&amp;">foobar&amp;</p>');
});

test('should be able to replace an element', async () => {
  const hom = HOMBuilder('<p><b>foobar</b></p>');
  const replacement = HOMBuilder('<i>foobar</i>');
  hom.firstChild.replaceChild(replacement.firstChild, hom.firstChild.firstChild);
  expect(hom.toString()).toBe('<p><i>foobar</i></p>');
});
