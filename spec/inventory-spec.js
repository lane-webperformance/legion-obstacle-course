'use strict';

const index = require('../src/index');
const fetch = require('node-fetch');

describe('The /inventory handler', function() {
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
    const update1 = JSON.stringify({ foo : 1, bar : 2 });
    const update2 = JSON.stringify({ foo : 2, baz : 3 });
    const headers = {'Content-Type':'application/json'};

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
    const update = JSON.stringify({ foo : 4, bar : 2 });
    const headers = {'content-type':'application/json'};

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

  it('supports PUT updates', function(done) {
    const update1 = JSON.stringify({ foo : 4, bar : 2 });
    const update2 = JSON.stringify({ foo : 4, baz : 9 });
    const headers = {'content-type':'application/json'};

    Promise.resolve().then(function() {
      return fetch(hostport + '/inventory', { method: 'PUT', body: update1, headers : headers });
    }).then(function(res) {
      return res.json();
    }).then(function(json) {
      expect(json).toEqual({ foo : 4, bar : 2 });
      return fetch(hostport + '/inventory', { method: 'PUT', body: update2, headers : headers });
    }).then(function(res) {
      return res.json();
    }).then(function(json) {
      expect(json).toEqual({ foo : 4, baz : 9 });
      done();
    }).catch(function(err) {
      done.fail(err);
    });
  });

  it('supports PATCH updates', function(done) {
    const update1 = JSON.stringify({ foo : 4, bar : 2 });
    const update2 = JSON.stringify({ foo : 1, baz : 9 });
    const headers = {'content-type':'application/json'};

    Promise.resolve().then(function() {
      return fetch(hostport + '/inventory', { method: 'PATCH', body: update1, headers : headers });
    }).then(function(res) {
      return res.json();
    }).then(function(json) {
      expect(json).toEqual({ foo : 4, bar : 2 });
      return fetch(hostport + '/inventory', { method: 'PATCH', body: update2, headers : headers });
    }).then(function(res) {
      return res.json();
    }).then(function(json) {
      expect(json).toEqual({ foo : 1, bar : 2, baz : 9 });
      done();
    }).catch(function(err) {
      done.fail(err);
    });
  });
});
