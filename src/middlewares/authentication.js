const jwt            = require('jwt-simple');

const auth           = require('../core/authentication');
const model          = require('../models');
const config         = require('../config');
const response       = require('../lib/response-handler');


to_authenticate      = []

module.exports = function(req, res, next) {
  var decodedToken, e, path, token, userId;
  path = req.path.split('/')[2];
  if (to_authenticate.indexOf(path) >= 0) {
    // authenticate user
    token = auth.getUserToken(req.headers);
    if (!token) {
      return response.unauthorized(res);
    }
    try {
      decodedToken = jwt.decode(token, config.server.salt);
    } catch (error1) {
      e = error1;
      return response.unauthorized(res);
    }
    userId = auth.getUserIdFromDecodedUserToken(decodedToken);
    req.userId = userId;
    return getUserDetailsFromUserId(req, res, next);
  } else {
    return next();
  }
};

getUserDetailsFromUserId = function(req, res, next) {
  return model.user.getUserById(req.userId, function(error, result) {
    var path, ref, ref1;
    if (error) {
      return response.unauthorized(res);
    }
    if (!result || result === null || result.length === 0) {
      return response.unauthorized(res);
    }
    req.headers.userLoginDetails = result[0];
    path = req.path;

    return next();
  });

};
