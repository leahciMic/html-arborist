const encodeEntities = require('./encodeEntities');

test('should encode entities correctly', () => {
  expect(encodeEntities('test & foo " baz < bar >')).toBe('test &amp; foo &quot; baz &lt; bar &gt;');
});
