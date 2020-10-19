//npm imports
mongoose = require('mongoose');

// local imports
config = require('../config/');
list_processor = require('./list_processor');

connection_string = 'mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.database;
mongoose.connect(connection_string, {
  auth: {
    user: config.database.username,
    password: config.database.password
  },
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function(res) {
  return console.log("Database connected ... ");
}).catch(function(error) {
  return process.exit();
});

ListProcessor = new list_processor();

module.exports = {
  Database: mongoose,
  ListProcessor: ListProcessor
};