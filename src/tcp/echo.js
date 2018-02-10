'use strict';

const net = require('net');

//TODO: does this have any unit tests?
module.exports.listen = function(port) {
  const server = net.createServer(function(socket) {
    socket.on('data', buffer => {
      for( const octet of buffer.values() ) {
        const response = Buffer.alloc(1);
        response.writeInt8(octet,1);
        socket.write(response);
      }
    });

    socket.on('error', err => {
      console.log(err); //eslint-disable-line no-console
    });
  });

  server.listen(port);

  return server;
};

///////////////////////////////////////////////////////////////////////////////
// As a Legion plugin.
///////////////////////////////////////////////////////////////////////////////

module.exports.port = 8500 + (parseInt(process.env.LEGION_PROCESS_NUMBER) || 0);
module.exports.host = 'localhost';

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
  return global.util.promifiy(services.getService('legion-obstacle-course').server.close)().then(() => services);
};

