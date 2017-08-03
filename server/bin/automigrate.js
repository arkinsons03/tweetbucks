require('events').EventEmitter.prototype._maxListeners = 0;
/**
 * automigrate
 * @see 
 */
var app = require('../server');
var ds = app.datasources.tweetbucks;
ds.autoupdate('users');
ds.autoupdate('payments');
ds.autoupdate('transactions');

process.exit()