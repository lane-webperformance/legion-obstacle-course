'use strict';

const express = require('express');
const bodyParser = require('body-parser');

module.exports.generateDocumentation = function() {
  let result = '';

  for( const key in module.exports ) {
    if( module.exports[key].documentation ) {
      result += module.exports[key].documentation;
      result += '\n\n###\n\n';
    }
  }

  return result;
};

module.exports.index = express().get('/', function(_req,res) {
  res.setHeader('content-type', 'text/plain');
  res.send(module.exports.generateDocumentation());
});

module.exports.index.documentation =
  'GET /\n' +
  '\n' +
  'Prints this documentation.';

module.exports.delay = require('./delay');
module.exports.inventory = require('./inventory');
module.exports.login = require('./login');
module.exports.ticket = require('./ticket');
module.exports.static = require('./static');

///////////////////////////////////////////////////////////////////////////////
// listen
///////////////////////////////////////////////////////////////////////////////

module.exports.listen = function() {
  const app = express();

  app.use(bodyParser.json({}))
     .use(this.index)
     .use(this.delay())
     .use(this.inventory())
     .use(this.login())
     .use(this.ticket())
     .use(this.static());

  return app.listen.apply(app, arguments);
};

///////////////////////////////////////////////////////////////////////////////
// As a Legion plugin.
///////////////////////////////////////////////////////////////////////////////

module.exports._legion_hooks = {};

module.exports._legion_hooks.beforeTestAction = function(services) {
  const port = 8500 + (process.env.LEGION_PROCESS_ID || 0);
  const server = module.exports.listen(port);

  return services.withService('legion-obstacle-course', {
    port : port,
    host : 'http://localhost:' + port.toString(),
    server : server
  });
};

module.exports._legion_hooks.afterTestAction = function(services) {
  services.getService('legion-obstacle-course').server.close();
};

