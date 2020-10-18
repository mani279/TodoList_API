const fs = require('fs');

module.exports = function(app) {
  app.get("/", function(req, res) {
    return res.send("Welcome to Todo API Service.");
  });
  return fs.readdir('./src/routes/', function(err, files) {
    if(files.length > 0){
      return files.forEach(function(file) {
        var routeName;
        if (file.indexOf("index.js") < 0) {
          routeName = file.slice(0, file.indexOf("-router.js"));
          return app.use("/v1/" + routeName.toString() + "/", require("./" + file));
        }
      });
    }
  });
};
