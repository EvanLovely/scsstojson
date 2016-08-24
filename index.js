'use strict';
var fs = require('fs');

function compile(items, options, done) {
  var options = options || {};
  items.forEach(function(pair) {
    var scssVarList = fs.readFileSync(pair.src, 'utf8').split('\n').filter(function(item) {
      return item.startsWith(pair.lineStartsWith);
    });
    // console.log(scssVarList, item.src);
    var varsAndValues = scssVarList.map(function(item) {
      // assuming `item` is `$color-gray: hsl(0, 0%, 50%); // main gray color`
      var x = item.split(':');
      var y = x[1].split(';');
      return {
        name: x[0].trim(), // i.e. $color-gray
        value: y[0].trim(), // i.e. hsl(0, 0%, 50%)
        comment: y[1].replace('//', '').trim() // any inline comment coming after, i.e. `// main gray color`
      };
    });

    if (! pair.allowVarValues) {
      varsAndValues = varsAndValues.filter(function(item) {
        return ! item.value.startsWith('$');
      });
    }

    fs.writeFileSync(pair.dest, JSON.stringify({
      items: varsAndValues,
      meta: {
        description: 'To add to these items, use Sass variables that start with <code>' + pair.lineStartsWith + '</code> in <code>' + pair.src + '</code>'
      }
    }, null, '  '));

  });
  done();
}

module.exports = compile;
