const htmlArborist = require('./htmlArborist');
const fs = require('fs');
const path = require('path');

const HTML_DIR = path.join(__dirname, '../test_html/');

const files = fs.readdirSync(HTML_DIR)
  .filter(x => x.endsWith('.html'));

files.forEach((file) => {
  test(file, async () => {
    const contents = fs.readFileSync(path.join(HTML_DIR, file));
    const fixed = htmlArborist(contents, 'http://example.com/foo');
    expect(fixed).toMatchSnapshot();
  });
});
