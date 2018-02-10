'use strict';

const index = require('../src/index').tcp.echo;
const PromiseSocket = require('promise-socket');

describe('The tcp echo server', function() {
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
    const client = new PromiseSocket();

    client.connect({ host: '127.0.0.1', port })
      .then(() => client.write('the quick brown fox jumped over the lazy dog'))
      .then(() => client.end())
      .then(() => client.read(3))
      .then(result => expect(result.toString()).toEqual('the'))
      .then(() => client.readAll())
      .then(result => expect(result.toString()).toEqual(' quick brown fox jumped over the lazy dog'))
      .then(done).catch(done.fail);
  });
});
