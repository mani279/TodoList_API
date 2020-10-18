const responseHandler = require('../lib/response-handler');

/**
 * 
 */
module.exports = class CInterface {
  constructor() {}

  createdResponse(data) {
    return responseHandler.createdResponse(data);
  }

  getReponse(data) {
    return responseHandler.getReponse(data);
  }

  errorResponse(error) {
    return responseHandler.errorResponse(error);
  }
  
};