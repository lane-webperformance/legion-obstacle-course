'use strict';

const express = require('express');

module.exports = function() {
  let inventory_holder = {};
  
  const app = express();

  app.get('/inventory', function(_req,res) {
    res.json(inventory_holder);
  });

  app.post('/inventory', function(req,res) {
    for( const key in req.body ) {
      if( typeof req.body[key] != 'number' )
        return res.sendStatus(400);
    }

    for( const key in req.body )
      inventory_holder[key] = (inventory_holder[key] || 0) + req.body[key];

    res.json(inventory_holder);
  });

  app.delete('/inventory', function(_req,res) {
    inventory_holder = {};
    res.json(inventory_holder);
  });

  app.put('/inventory', function(req,res) {
    inventory_holder = JSON.parse(JSON.stringify(req.body));
    res.json(inventory_holder);
  });

  app.patch('/inventory', function(req,res) {
    inventory_holder = Object.assign({},
      inventory_holder,
      JSON.parse(JSON.stringify(req.body)));
    res.json(inventory_holder);
  });

  return app;
};

module.exports.documentation =
  'GET /inventory\n' +
  'POST /inventory\n' +
  'DELETE /inventory\n' +
  '\n' +
  'Prints the current inventory. Unless you\'ve manipulated inventory using a POST,PUT, or PATCH to /inventory, this will be an empty JSON object.\n' +
  'The inventory is a flat JSON object mapping keys to numerical values. Any attempt to use any non-numerical value will result in a 400 error.\n' +
  'By POSTing JSON content, update the inventory by adding the numerical values of the new keys to the values already in storage.\n' +
  'By PUTing JSON content, update the inventory by replacing the entire inventory with the new JSON object.\n' +
  'By PATCHing JSON content, update the inventory by setting each key in the new JSON object (but leaving the remainder intact).\n' +
  'By DELETEing, remove all inventory items.';


