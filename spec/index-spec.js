'use strict';

const index = require('../src/index');
const fetch = require('node-fetch');

describe('The / handler (that is, root index handler)', function() {
  let server = null;
  const port = 5000;
  const hostport = 'http://localhost:' + port;

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
