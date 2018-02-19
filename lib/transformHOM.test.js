const transformHom = require('./transformHOM');
const H$ = require('../HOM/HOMBuilder');

test('should be able to map over dom', async () => {
  const html = transformHom((node) => {
    if (node.tagName === 'b') {
      node.parent.replaceChild(H$('<i>anyone</i>').firstChild, node);
    }
  }, H$('<div>hello <b>world</b></div>'));
  expect(html.toString()).toBe('<div>hello <i>anyone</i></div>');
});

test('should remove nodes when undefined is returned', () => {
  const html = transformHom((node) => {
    if (node.tagName === 'p') {
      node.parent.removeChild(node);
    }
  }, H$('<div>hello<p>world</p></div>'));
  expect(html.toString()).toBe('<div>hello</div>');
});

test('should not mutate the hom', () => {
  const html = '<div>hello<p id="foo">world</p></div>';
  const hom = H$(html);
  transformHom((node) => {
    if (node.setAttribute) {
      node.setAttribute('id', 'blah');
      node.setAttribute('foo', 'blah');
    }
  }, hom);
  expect(hom.toString()).toBe(html);
});
