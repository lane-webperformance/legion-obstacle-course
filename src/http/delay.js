'use strict';

const express = require('express');

///////////////////////////////////////////////////////////////////////////////
// delay
///////////////////////////////////////////////////////////////////////////////

module.exports = function() {
  return express().get('/delay', function(req,res) {
    const response_millis = parseInt(req.query.response) || 0;
    const content_millis = parseInt(req.query.content) || 0;

    res.setHeader('content-type', 'text/plain');

    setTimeout(function() {
      res.write('Responded after ' + response_millis + ' milliseconds.\n');
      res.write('\n');
      res.write(module.exports.documentation + '\n');
      res.write('\n');
      res.write('--- delaying here for ' + content_millis + ' milliseconds ---\n');
      setTimeout(function() {
        res.write('--- finished ---');
        res.end();
      }, content_millis);
    }, response_millis);
  });
};
module.exports.documentation =
  'GET /delay?response={integer}&content={integer}\n' +
  '\n' +
  'Responds while introducing the specified artificial delays. Used to simulate slow response times.\n' +
  '\n' +
  'response - How long (in milliseconds) to delay before writing the response headers. Optional. Default is 0.\n' +
  'content - How long (in milliseconds) to delay before writing the content. This happens in the middle of the content, that is, some content is written immediately before and after the delay. Optional. Default is 0.';

