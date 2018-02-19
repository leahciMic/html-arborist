const htmlArborist = require('../lib/htmlArborist');
const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.join(__dirname, '../test_html/wikipedia.html')).toString();

console.log(`
<html> <head> <style> body { font-family: 'Helvetica'; } li { clear: both; } img {
vertical-align: middle; /* float: left; */ margin: 1rem; border-radius: 5px; display: inline-block;
box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19); } table {
font-family: arial, sans-serif; border-collapse: collapse; width: 100%; } td, th {
border: 1px solid #dddddd; text-align: left; padding: 8px; } th { background: #efefef;
} </style> </head> <body>`);

console.log(htmlArborist(contents, 'https://en.wikipedia.org/wiki/Arborist').toString());

console.log('</body></html>');
