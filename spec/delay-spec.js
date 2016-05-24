var index = require('../src/index');
var fetch = require('node-fetch');

describe('The /delay handler', function() {
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
    fetch(hostport + '/delay').then(function(res) {
      expect(res.ok).toBe(true);
      return res.text();
    }).then(function(txt) {
      expect(txt.length).toBeGreaterThan(0);
      done();
    }).catch(function(err) {
      done.fail(err);
    });
  });

  it('waits a specified time before returning', function(done) {
    var start = Date.now();

    fetch(hostport + '/delay?response=2000').then(function() {
      expect(Date.now() - start).toBeGreaterThan(1900);
      expect(Date.now() - start).toBeLessThan(2100);
      done();
    }).catch(function(err) {
      done.fail(err);
    });
  });

  it('waits a specified time before rendering content', function(done) {
    var start = Date.now();

    fetch(hostport + '/delay?content=2000').then(function(res) {
      expect(Date.now() - start).toBeLessThan(100);
      return res.text();
    }).then(function() {
      expect(Date.now() - start).toBeGreaterThan(1900);
      expect(Date.now() - start).toBeLessThan(2100);
      done();
    }).catch(function(err) {
      done.fail(err);
    });
  });
});
