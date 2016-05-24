
var express = require('express');
var bodyParser = require('body-parser');

module.exports.generateDocumentation = function() {
  var result = '';

  for( var key in module.exports ) {
    if( module.exports[key].documentation ) {
      result += module.exports[key].documentation;
      result += '\n\n###\n\n';
    }
  }

  return result;
};

module.exports.index = express().get('/', function(req,res) {
  res.setHeader('content-type', 'text/plain');
  res.send(module.exports.generateDocumentation());
});
module.exports.index.documentation =
  'GET /\n' +
  '\n' +
  'Prints this documentation.';

module.exports.inventory = require('./inventory');
module.exports.delay = require('./delay');

///////////////////////////////////////////////////////////////////////////////
// listen
///////////////////////////////////////////////////////////////////////////////

module.exports.listen = function() {
  var app = express();

  app.use(bodyParser.json({}))
     .use(this.index)
     .use(this.inventory())
     .use(this.delay());

  return app.listen.apply(app, arguments);
};
