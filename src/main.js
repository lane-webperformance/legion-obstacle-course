/* eslint-disable no-console */

var process = require('process');

var port = 4321;

if( process.argv.indexOf('--server') > 0 ) {
  require('./index').listen(port, function() {
    console.log('Obstacle course listening on 127.0.0.1:' + port + '.');
  });
}

if( process.argv.indexOf('--docs') > 0 ) {
  console.log(require('./index').generateDocumentation());
}
