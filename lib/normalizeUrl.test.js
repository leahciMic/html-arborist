const normalizeUrl = require('./normalizeUrl');

test('should normalize relative urls', () => {
  expect(normalizeUrl('/foo/bar', 'https://example.com/baz/')).toBe('https://example.com/foo/bar');
  expect(normalizeUrl('foo/bar', 'https://example.com/baz/')).toBe('https://example.com/baz/foo/bar');
  expect(normalizeUrl('../foo/bar', 'https://example.com/baz/')).toBe('https://example.com/foo/bar');
});

test('should not touch absolute urls', () => {
  expect(normalizeUrl('https://google.com', 'https://example.com')).toBe('https://google.com');
});

test('should not touch data urls', () => {
  expect(normalizeUrl('data:foobar', 'https://example.com')).toBe('data:foobar');
});

test('should not touch fragment urls', () => {
  expect(normalizeUrl('#foobar', 'http://www.example.com')).toBe('#foobar');
});

test('should not touch javascript urls', () => {
  // eslint-disable-next-line no-script-url
  expect(normalizeUrl('javascript:alert(\'hi\'', 'https://example.com')).toBe('javascript:alert(\'hi\'');
});
