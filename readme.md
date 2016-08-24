# Scss to JSON

Scans `*.scss` files and turns the information into JSON. Very useful with [Pattern Lab](http://patternlab.io) as you can auto-matically update your styleguide with your styles.

## Install

    npm install --save scsstojson

## Usage

```js
var scssToJson = require('scsstojson');

var items = [
  {
    "src": "src/0-base/00-colors/_colors.scss",
    "dest": "patternlab/source/_patterns/0-base/00-colors/colors.json",
    "lineStartsWith": "$c-",
    "allowVarValues": false
  }, {
    "src": "src/0-base/00-fonts/_fonts.scss",
    "dest": "patternlab/source/_patterns/0-base/00-fonts/fonts.json",
    "lineStartsWith": "$font-",
    "allowVarValues": false
  }
];

var options = {}; // no options yet, but they'll go here eventually

scssToJson(items, options, function() {
  console.log('all done!');
});
```

If `_colors.scss` looks like this:

```scss
$c-gray--lightest: hsl(0, 0%, 87%);
$c-gray--lighter: hsl(0, 0%, 74%);
$c-gray--light: hsl(0, 0%, 60%);
$c-gray: hsl(0, 0%, 48%);
$c-gray--dark: hsl(0, 0%, 40%);
$c-gray--darker: hsl(0, 0%, 26%);
$c-gray--darkest: hsl(0, 0%, 13%);

$c-blue: hsl(193, 79%, 42%);

$c-green: hsl(89, 46%, 16%);
$c-orange: hsl(18, 73%, 53%);
$c-yellow: hsl(43, 100%, 74%);
$c-orange--light: hsl(31, 98%, 70%);

$c-border: $c-gray;
```

It would output this for `colors.json`:

```json
{
  "items": [
    {
      "name": "$c-gray--lightest",
      "value": "hsl(0, 0%, 87%)",
      "comment": ""
    },
    {
      "name": "$c-gray--lighter",
      "value": "hsl(0, 0%, 74%)",
      "comment": ""
    },
    {
      "name": "$c-gray--light",
      "value": "hsl(0, 0%, 60%)",
      "comment": ""
    },
    {
      "name": "$c-gray",
      "value": "hsl(0, 0%, 48%)",
      "comment": ""
    },
    {
      "name": "$c-gray--dark",
      "value": "hsl(0, 0%, 40%)",
      "comment": "Favorite Gray"
    },
    {
      "name": "$c-gray--darker",
      "value": "hsl(0, 0%, 26%)",
      "comment": ""
    },
    {
      "name": "$c-gray--darkest",
      "value": "hsl(0, 0%, 13%)",
      "comment": ""
    },
    {
      "name": "$c-blue",
      "value": "hsl(193, 79%, 42%)",
      "comment": "Primary Color"
    },
    {
      "name": "$c-green",
      "value": "hsl(89, 46%, 16%)",
      "comment": "Secondary Color"
    },
    {
      "name": "$c-orange",
      "value": "hsl(18, 73%, 53%)",
      "comment": ""
    },
    {
      "name": "$c-yellow",
      "value": "hsl(43, 100%, 74%)",
      "comment": ""
    },
    {
      "name": "$c-orange--light",
      "value": "hsl(31, 98%, 70%)",
      "comment": ""
    }
  ],
  "meta": {
    "description": "To add to these items, use Sass variables that start with <code>$c-</code> in <code>src/0-base/00-colors/_colors.scss</code>"
  }
}
```

And then you can have this as your Twig Pattern Lab pattern file right next to the `colors.json`:

```twig
<ul class="sg-colors">
  {% for item in items %}
    <li>
      <div class="sg-swatch" style="background: {{item.value}};"></div>
      <div class="sg-info">
        <span>{{item.value}}</span> <br/>
        <code>{{item.name}}</code>
        {% if item.comment %}<div class="comment">{{ item.comment }}</div>{% endif %}
      </div>
    </li>
  {% endfor %}
</ul>
{% if meta %}
  <p> <small>{{ meta.description }}</small> </p>
{% endif %}
```

Enjoy!
