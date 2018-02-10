'use strict';

const index = require('../src/index').tcp.echo;

describe('The tcpSocketPing server', function() {
  let server = null;
  const port = 5000;

  beforeEach(function() {
    server = index.listen(port);
  });

  afterEach(function() {
    server.close();
    server = null;
  });

  it('responds to a ping', function(done) {
    //TODO: implement testcase for this
    done();
  });
});
