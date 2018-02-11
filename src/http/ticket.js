'use strict';

const express = require('express');

module.exports = function() {
  const tickets = {};
  
  const app = express();

  app.post('/ticket/new', function(_req,res) {
    const ticket = Math.round(Math.random()*1000000000+1).toString();

    tickets[ticket] = true;

    res.json({
      status : 'success',
      ticket : ticket
    });
  });

  app.post('/ticket/redeem', function(req,res) {
    const ticket = req.query.ticket || '0';

    if( tickets[ticket] ) {
      tickets[ticket] = false;
    
      res.json({ status : 'success' });
    } else {
      res.status(422).json({
        status : 'failure',
        reason : 'ticket ' + req.query.ticket + ' not found'
      });
    }
  });

  return app;
};

module.exports.documentation =
  'POST /ticket/new\n' +
  'POST /ticket/redeem?ticket={integer}\n' +
  '\n' +
  'Get a random ID number (called a ticket) and later redeem it by submitting the same ticket.\n' +
  'Each ticket can only be redeemed once.\n' +
  'Each call yields a JSON response with a "status" field with possible values "success" or "failure".\n' +
  'If there is a failure, there will be a "reason" field with a human-readable explanation.\n' +
  'When a new ticket is created, there will be a "ticket" field with the randomly selected ID of the ticket.\n';
