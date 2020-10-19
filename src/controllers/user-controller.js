// local imports
const Controller      = require('../core/controller');

const httpStatusCode  = require('../lib/http-status-codes');
const model           = require('../models/');
const util            = require('../lib/utilities');

User = (function() {
  var context;

  class User extends Controller {
    constructor() {
      super();
      context = this;    
    }

    create(req, res) {
      return model.user.create(req.body, function(err, result) {
        if (err) {
          res.status(httpStatusCode.BAD_REQUEST).send(context.responseError(err));
          return null;
        }
        return res.status(httpStatusCode.OK).send(context.responseGet(result));
      });
    }
  };

  context = {};

  return User;

}).call(this);

module.exports = User;
