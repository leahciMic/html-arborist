function encodeEntity(char) {
  switch (char) {
    case '"':
      return '&quot;';
    case '&':
      return '&amp;';
    case '<':
      return '&lt;';
    case '>':
      return '&gt;';
    default:
      return char;
  }
}

module.exports = function encode(attr) {
  return attr
    .split('')
    .map(encodeEntity)
    .join('');
};
