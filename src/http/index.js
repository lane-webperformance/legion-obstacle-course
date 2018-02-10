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

module.exports.tcpSocketPingListen = function(port) {
  require('./tcp-socket-ping')(port);
};

///////////////////////////////////////////////////////////////////////////////
// As a Legion plugin.
///////////////////////////////////////////////////////////////////////////////

module.exports.port = 8500 + (parseInt(process.env.LEGION_PROCESS_NUMBER) || 0);
module.exports.host = 'http://localhost:' + module.exports.port.toString();

module.exports._legion_hooks = {};

module.exports._legion_hooks.beforeTestAction = function(services) {
  const server = module.exports.listen(module.exports.port);

  return services.withService('legion-obstacle-course', {
    port : module.exports.port,
    host : module.exports.host,
    server : server
  });
};

module.exports._legion_hooks.afterTestAction = function(services) {
  services.getService('legion-obstacle-course').server.close();
};

