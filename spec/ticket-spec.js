'use strict';

const fetch = require('node-fetch');
const index = require('../src/index').http;
const R = require('ramda');

describe('The /ticket handler', function() {
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

  it('can create lots of tickets in parallel', function(done) {
    const tickets = [];

    for( let i = 0; i < 100; i++ )
      tickets.push(fetch(hostport + '/ticket/new', { method: 'POST' })
        .then(res => res.json())
        .then(json => json.ticket));

    Promise.all(tickets)
      .then(ts => {
        expect(R.uniq(ts).length).toBe(100);
        ts.forEach(t => expect(t).toBeGreaterThan(0));
      })
      .then(done)
      .catch(done.fail);
  });
});
