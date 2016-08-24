/* global describe, it */
const fs = require('fs');
const assert = require('assert');
const scssToJson = require('../');

describe('it', () => {
  console.log(process.cwd());
  it('works', () => {
    const expected = require('./expected.json');
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
