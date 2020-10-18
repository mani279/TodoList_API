
const constant      = require('./constants');

const database      = constant.DATABASE;
const dbHost        = constant.DB_HOST;
const environment   = constant.environment;
const dbPassword    = constant.DB_PASSWORD;
const dbPort        = constant.DB_PORT;
const dbUser        = constant.DB_USER;

setDbEnvironment = function(database, dbHost, dbPassword, dbPort, dbUser , environment) {
  let dbObj          = {};
  dbObj[environment] = {
    database          : database,
    host              : dbHost,
    logging           : false,
    password          : dbPassword,
    port              : dbPort,
    username          : dbUser,
  };
  return dbObj;
};

module.exports = setDbEnvironment(database, dbHost, dbPassword, dbPort, dbUser , environment);
