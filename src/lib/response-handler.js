/*
ResponseHandler
To handle reponses with defined structure
*/

const httpStatusCode = require('../lib/http-status-codes');

var responseHandler;

responseHandler = (function() {
  var responseStructure;

  class ResponseHandler {
    static createdResponse(data) {
      data.success = true;
      return responseStructure(data, false);
    }

    static getReponse(data) {
      data.success = true;
      return responseStructure(data, false);
    }

    static deleteResponse(data) {
      data.success = true;
      return responseStructure(data, true);
    }

    static errorResponse(error) {
      if (!error) {
        error = {};
      }
      error.success = false;
      return responseStructure(error, false);
    }

    static unauthorized(res) {
      var data;
      data = {};
      data.success = false;
      data.error = {
          code: httpStatusCode.UNAUTHORIZED,
          message: "You are not authorized to use this application."
        }
      return res.status(httpStatusCode.UNAUTHORIZED).send(responseStructure(data, false));
    }

  };

  responseStructure = function(data, isDeleteResponse) {
    var ref, ref1, ref2, ref3;

    if(!isDeleteResponse) {
      return {
        success: (ref = data.success) != null ? ref : false,
        data: (ref1 = data.data) != null ? ref1 : {},
        count: (ref2 = data.count) != null ? ref2 : 0,
        totalCount: (ref3 = data.totalCount) != null ? ref3 : (ref2 = data.count) != null ? ref2 : 0,
        error: (ref4 = data.error) != null ? ref4 : []
      };
    }
    else {
      return {
        success: (ref = data.success) != null ? ref : false,
        data: (ref1 = data.data) != null ? ref1 : {},
        error: (ref4 = data.error) != null ? ref4 : []
      };
    }
  };

  return ResponseHandler;

}).call(this);

module.exports = responseHandler;
