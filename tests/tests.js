/* global describe, it */
var fs = require('fs');
var assert = require('assert');
var scssToJson = require('../');

describe('it', function() {
  console.log(process.cwd());
  it('works', function() {
    var expected = require('./expected.json');
    var items = [
      {
        "src": "tests/_colors.scss",
        "dest": "tests/colors.json",
        "lineStartsWith": "$c-",
        "allowVarValues": false
      }
    ];
    scssToJson(items, {}, function() {
      var actual = require('./colors.json');
      assert.deepStrictEqual(actual, expected);
    });
  });
});
