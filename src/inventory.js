
var express = require('express');

///////////////////////////////////////////////////////////////////////////////
// inventory
///////////////////////////////////////////////////////////////////////////////

module.exports = function() {
  var inventory_holder = {};
  
  var app = express();

  app.get('/inventory', function(req,res) {
    res.json(inventory_holder);
  });

  app.post('/inventory', function(req,res) {
    for( var key in req.body ) {
      if( typeof req.body[key] != 'number' )
        return res.sendStatus(400);
    }

    for( key in req.body )
      inventory_holder[key] = (inventory_holder[key] || 0) + req.body[key];

    res.json(inventory_holder);
  });

  app.delete('/inventory', function(req,res) {
    inventory_holder = {};
    res.json(inventory_holder);
  });

  return app;
};

module.exports.documentation =
  'GET /inventory\n' +
  'POST /inventory\n' +
  'DELETE /inventory\n' +
  '\n' +
  'Prints the current inventory. Unless you\'ve manipulated inventory using a POST to /inventory, this will be an empty JSON object.\n' +
  'By POSTing JSON content, update the inventory by adding the numerical values of each key. Any non-numerical value is a 400 error.\n' +
  'By DELETEing, remove all inventory items.';
