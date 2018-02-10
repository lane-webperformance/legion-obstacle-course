'use strict';

const index = require('../src/index').http;
const fetch = require('node-fetch');

describe('The / handler (that is, root index handler)', function() {
  let service = null;

  beforeEach(function() {
    service = index._legion_hooks.beforeTestAction({
      withService : function(k,v) {
        expect(k).toEqual('legion-obstacle-course');
        expect(v).toBeDefined();
        expect(v.host).toBeDefined();
        expect(v.server).toBeDefined();
        expect(v.port).toBeDefined();
        this[k] = v;
        return this;
      },

      getService : function(k) {
        expect(k).toEqual('legion-obstacle-course');
        return this[k];
      }
    });
  });

  afterEach(function() {
    index._legion_hooks.afterTestAction(service);
  });

  it('returns a result', function(done) {
    fetch(service.getService('legion-obstacle-course').host + '/').then(function(res) {
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
