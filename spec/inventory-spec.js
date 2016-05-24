var index = require('../src/index');
var fetch = require('node-fetch');

describe('The /inventory handler', function() {
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

  it('returns a result', function(done) {
    fetch(hostport + '/inventory').then(function(res) {
      expect(res.ok).toBe(true);
      return res.json();
    }).then(function(json) {
      expect(json).toEqual({});
      done();
    }).catch(function(err) {
      done.fail(err);
    });
  });

  it('supports POST updates', function(done) {
    var update1 = JSON.stringify({ foo : 1, bar : 2 });
    var update2 = JSON.stringify({ foo : 2, baz : 3 });
    var headers = {'Content-Type':'application/json'};

    Promise.resolve().then(function() {
      return fetch(hostport + '/inventory', { method: 'POST', body: update1, headers : headers });
    }).then(function(res) {
      return res.json();
    }).then(function(json) {
      expect(json).toEqual({ foo : 1, bar : 2 });
      return fetch(hostport + '/inventory', { method: 'POST', body: update2, headers : headers });
    }).then(function(res) {
      return res.json();
    }).then(function(json) {
      expect(json).toEqual({ foo : 3, bar : 2, baz : 3 });
      done();
    }).catch(function(err) {
      done.fail(err);
    });
  });

  it('supports DELETE updates', function(done) {
    var update = JSON.stringify({ foo : 4, bar : 2 });
    var headers = {'content-type':'application/json'};

    Promise.resolve().then(function() {
      return fetch(hostport + '/inventory', { method: 'POST', body: update, headers : headers });
    }).then(function(res) {
      return res.json();
    }).then(function(json) {
      expect(json).toEqual({ foo : 4, bar : 2 });
      return fetch(hostport + '/inventory', { method: 'DELETE' });
    }).then(function(res) {
      return res.json();
    }).then(function(json) {
      expect(json).toEqual({});
      done();
    }).catch(function(err) {
      done.fail(err);
    });
  });
});
