# HTML Arborist

[![Build Status](https://travis-ci.org/leahciMic/html-arborist.svg?branch=master)](https://travis-ci.org/leahciMic/html-arborist)

> Parse HTML into a object model, and perform tree surgery.

A library that parses HTML into an object model. Allowing you to perform complex
transforms on the tree of nodes, and stitch it back together producing modified
HTML.

It's a little rough around the edges, not optimised, and not flexible. These
things will change over time. This is the start.

## Table of Contents

- [Background](#background)
- [Usage](#usage)
- [API](#api)
- [Contribute](#contribute)
- [License](#license)

## Usage

```javascript
const htmlArborist = require('html-arborist');

htmlArborist('<html><body><h1 onclick="alert(\'hello\')">Hello</h1></body></html>'); // <h2>Hello</h2>
```

## API

A much more refined API allowing you to specify what transforms, and options for
those transforms is coming.

## Contribute

See [the contribute file](CONTRIBUTING.md)!

PRs accepted.

## License

[MIT © Michael Leaney](LICENSE)
