// Class imports
const Controller     = require('../core/controller');


// npm imports
const jwt            = require('jwt-simple');



// local imports
const auth           = new(require('../core/authentication'))();
const httpStatusCode = require('../lib/http-status-codes');
const model          = require('../models');
const response       = require('../lib/response-handler');


Auth = (function() {
  var context;

  class Auth extends Controller {
    constructor() {
      super();
      context = this;
    }


    /**
     * Authenticates User
     * @param {*} req - Request Received 
     * @param {*} res - Response to be sent
     */
    login(req, res) {
      return model.user.login(req.body, function(err, result) {
        if (err) {
          res.status(httpStatusCode.BAD_REQUEST).send(context.responseError(err));
          return null;
        }
        return res.status(httpStatusCode.OK).send(context.responseGet(result));
      });
    }

    /**
     * logs out
     * @param {*} req - Request Received  
     * @param {*} res - Response to be sent 
     */
    logout(req, res) {
      const token = auth.getToken(req.headers);
      if (!token) {
        return response.unauthorized(res);
      }
      const result = {status: true, data:{}, count:0 , error:[]}
      return res.status(httpStatusCode.OK).send(context.responseGet(result));
    }

  };

  context = {};

  return Auth;

}).call(this);

module.exports = Auth;
