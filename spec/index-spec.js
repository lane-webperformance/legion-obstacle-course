var index = require('../src/index');
var fetch = require('node-fetch');

describe('The / handler (that is, root index handler)', function() {
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
    fetch(hostport + '/').then(function(res) {
      expect(res.ok).toBe(true);
      return res.text();
    }).then(function(txt) {
      expect(txt.length).toBeGreaterThan(0);
      done();
    }).catch(function(err) {
      done.fail(err);
    });
  });
});
