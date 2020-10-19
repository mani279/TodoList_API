var checkEnvironment, environment;

environment = process.env.NODE_ENV === void 0 ? 'default' : process.env.NODE_ENV;

checkEnvironment = function(environment) {
  if (environment === 'default') {
    return {
      API_HOST           : 'localhost',
      API_PROTOCOL       : 'http',
      APP_NAME           : 'todo',
      DATABASE           : 'mean-test',
      DB_HOST            : 'ds223578.mlab.com',
      DB_PASSWORD        : 'manisha123',
      DB_PORT            :  23578,
      DB_USER            : 'manisha',
      environment        : environment
    };
  }
  if (environment === 'local') {
    return {
      API_HOST           : 'localhost',
      API_PROTOCOL       : 'http',
      APP_NAME           : 'todo',
      DATABASE           : 'todo',
      DB_HOST            : 'localhost',
      DB_PASSWORD        : '',
      DB_PORT            :  27017,
      DB_USER            : '',
      environment        : environment
    };
  }
};

module.exports = checkEnvironment(environment);
