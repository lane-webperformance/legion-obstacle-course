'use strict';

const express = require('express');

const LOGINS = JSON.stringify(['hello1','ajmurray','joe@example.com', 'sue@example.com', 'testaccount1', 'testaccount2', 'testaccount3', 'testaccount4', 'testaccount5']);

module.exports = function() {
  const app = express();

  const logins = JSON.parse(LOGINS);

  app.post('/login', function(req,res) {
    const ix = logins.indexOf(req.query.id);

    if( ix >= 0 ) {
      logins.splice(ix,1);
      res.json({ status : 'success' });
    } else {
      res.status(422).json({ status : 'failure',
                             reason : 'user ID ' + req.query.id + ' never existed or already used' });
    }
  });

  return app;
};

module.exports.documentation =
  'POST /login?id={user identity}\n' +
  '\n' +
  'Login to a service with a single-use identity.\n' +
  'If you login twice with the same identity, or login with an identity not in the pre-built list, the result will be a failure.\n' +
  'The logins are:' + LOGINS + '\n';
