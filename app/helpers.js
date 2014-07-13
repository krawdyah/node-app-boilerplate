var hbs = require('hbs')
  , blocks = {};

module.exports = function(config){
  hbs.registerPartials(config.root + '/app/views/partials');

  hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }
    block.push(context.fn(this));
  });

  hbs.registerHelper('yield', function(name) {
    var val = (blocks[name] || []).join('\n');
    // clear the block
    blocks[name] = [];
    return val;
  });

}

// Usage:
// Layout: {{{yield "awe"}}}
// Pages: {{#extend "awe"}}<h1>Awe</h1>{{/extend}}