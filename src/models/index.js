const fs = require('fs');

let models = {};

fs.readdirSync('./src/models/').forEach(function(file) {
  var modelName;
  if (file.indexOf("index.js") < 0) {
    modelName = file.slice(0, file.indexOf("-model.js"));
    return models[modelName] = require("./" + file);
  }
});

module.exports = models;
