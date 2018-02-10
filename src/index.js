'use strict';

module.exports.http = require('./http');
module.exports.tcp = require('./tcp');

// For backwards compatibility, and also because it's usualy what people want, pull in the HTTP hooks by default.
module.exports._legion_hooks = module.exports.http._legion_hooks;
