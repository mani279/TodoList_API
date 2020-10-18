(function() {

  const database          = require('./database');
  const paginationConfig  = require('./pagination');
  const serverConfig      = require('./server');

  const config = (function() {
    var environment;

    function config() {}

    environment        = process.env.NODE_ENV === void 0 ? 'default': process.env.NODE_ENV;

    config.server      = {
      env              : environment,
      port             : serverConfig[environment].PORT,
      salt             : serverConfig[environment].SALT,
      saltRounds       : serverConfig[environment].SALT_ROUNDS
    };

    config.database    = {
      database         : database[environment].database,
      host             : database[environment].host,
      logging          : database[environment].logging,
      password         : database[environment].password,
      port             : database[environment].port,
      username         : database[environment].username
    };

    config.pagination  = {
      limit            : paginationConfig[environment].LIMIT,
      offset           : paginationConfig[environment].OFFSET
    };
    
    return config;

  })();

  module.exports = config;

}).call(this);