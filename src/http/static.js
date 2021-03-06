'use strict';

const express = require('express');
const path = require('path');

///////////////////////////////////////////////////////////////////////////////
// static
///////////////////////////////////////////////////////////////////////////////

const static_dir = path.join(__dirname, '../../static');

module.exports = function() {
  return express().use('/static', express.static(static_dir));
};
module.exports.documentation =
  'GET /static\n' +
  '\n' +
  'Serves various static files.\n';
