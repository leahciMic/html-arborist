const HNodeRoot = require('./HNodeRoot');
const HElementNode = require('./HElementNode');
const HTextNode = require('./HTextNode');
const { Parser } = require('htmlparser2');

module.exports = function HOMBuilder(html) {
  let currentNode = new HNodeRoot();
  const rootNode = currentNode;

  // htmlparser2 has an onend event and is streaming/ asynchronous
  // if we give it the entire html string it will be parsed synchronously

  const handler = {
    onopentag(tagName, attributes) {
      const node = new HElementNode({ tagName, attributes, parent: currentNode });
      currentNode.appendChild(node);
      currentNode = node;
    },
    onclosetag() {
      currentNode = currentNode.parent;
    },
    ontext(text) {
      const node = new HTextNode({ parent: currentNode });
      node.textContent = text;
      currentNode.appendChild(node);
    },
    onend() {
    },
    onerror(err) {
      console.error(err);
    },
  };

  const parser = new Parser(handler, {
    decodeEntities: true,
  });

  parser.end(html);
  return rootNode;
};
