'use strict';

const fetch = require('node-fetch');
const index = require('../src/index').http;
const querystring = require('querystring');

describe('The /login handler', function() {
  const port = 5000;
  const hostport = 'http://localhost:' + port;
  let server = null;

  beforeEach(function() {
    server = index.listen(port);
  });

  afterEach(function() {
    server.close();
    server = null;
  });

  it('can login with a user ID', function(done) {
    Promise.resolve().then(() => {
      return fetch(hostport + '/login?' + querystring.stringify({ id: 'joe@example.com'}), { method: 'POST' });
    }).then(res => {
      expect(res.ok).toBe(true);
      return res.json();
    }).then(json => {
      expect(json.status).toEqual('success');
    }).then(() => {
      return fetch(hostport + '/login?' + querystring.stringify({ id: 'testaccount5'}), { method: 'POST' });
    }).then(res => {
      expect(res.ok).toBe(true);
      return res.json();
    }).then(json => {
      expect(json.status).toEqual('success');
    }).then(done).catch(done.fail);
  });

  it("can't login with a user ID twice", function(done) {
    Promise.resolve().then(() => {
      return fetch(hostport + '/login?' + querystring.stringify({ id: 'joe@example.com'}), { method: 'POST' });
    }).then(res => {
      expect(res.ok).toBe(true);
      return res.json();
    }).then(json => {
      expect(json.status).toEqual('success');
    }).then(() => {
      return fetch(hostport + '/login?' + querystring.stringify({ id: 'joe@example.com'}), { method: 'POST' });
    }).then(res => {
      expect(res.ok).toBe(false);
      return res.json();
    }).then(json => {
      expect(json.status).toEqual('failure');
    }).then(done).catch(done.fail);
  });

  it("can't login with an invalid user ID", function(done) {
    Promise.resolve().then(() => {
      return fetch(hostport + '/login?' + querystring.stringify({ id: 'fred'}), { method: 'POST' });
    }).then(res => {
      expect(res.ok).toBe(false);
      return res.json();
    }).then(json => {
      expect(json.status).toEqual('failure');
    }).then(() => {
      return fetch(hostport + '/login?' + querystring.stringify({ id: 'george'}), { method: 'POST' });
    }).then(res => {
      expect(res.ok).toBe(false);
      return res.json();
    }).then(json => {
      expect(json.status).toEqual('failure');
    }).then(done).catch(done.fail);
  });
});
