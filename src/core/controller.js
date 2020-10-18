const responseHandler = require('../lib/response-handler');

module.exports = class Controller { 
  constructor() {
  }

  responseError(error) {
    return responseHandler.errorResponse(error);
  }

  responseCreate(data) {
    return responseHandler.createdResponse(data);
  }

  responseGet(data) {
    return responseHandler.getReponse(data);
  }

  responseDelete(data) {
    return responseHandler.deleteResponse(data);
  }
};