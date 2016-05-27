var index = require('../src/index');
var fetch = require('node-fetch');

describe('The /ticket handler', function() {
  var server;
  var port = 5000;
  var hostport = 'http://localhost:' + port;

  beforeEach(function() {
    server = index.listen(port);
  });

  afterEach(function() {
    server.close();
    server = null;
  });

  it('can create and redeem tickets', function(done) {
    Promise.resolve().then(function() {
      return fetch(hostport + '/ticket/new', { method: 'POST' });
    }).then((res) => res.json()).then(function(json) {
      expect(json.status).toEqual('success');
      return fetch(hostport + '/ticket/redeem?ticket=' + json.ticket, { method: 'POST' });
    }).then((res) => res.json()).then(function(json) {
      if( json.status != 'success' )
        throw new Error(json.status + ': ' + json.reason);
      done();
    }).catch(function(err) {
      done.fail(err);
    });
  });

  it('can not redeem a bogus ticket', function(done) {
    Promise.resolve().then(function() {
      return fetch(hostport + '/ticket/redeem?ticket=123456', { method: 'POST' });
    }).then((res) => res.json()).then(function(json) {
      expect(json.status).toEqual('failure');
      done();
    }).catch(function(err) {
      done.fail(err);
    });
  });

});
