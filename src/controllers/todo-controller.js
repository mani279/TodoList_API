// local imports
const Controller      = require('../core/controller');

const httpStatusCode  = require('../lib/http-status-codes');
const model           = require('../models/');
const util            = require('../lib/utilities');

Todo = (function() {
  var context;

  class Todo extends Controller {
    constructor() {
      super();
      context = this;    
    }

    create(req, res) {
      return model.todo.create(req.body, function(err, result) {
        if (err) {
          res.status(httpStatusCode.BAD_REQUEST).send(context.responseError(err));
          return null;
        }
        return res.status(httpStatusCode.CREATED).send(context.responseGet(result));
      });
    }

    get(req,res){
      return model.todo.get(req.query, req.params, req.headers.userLoginDetails, function(error, result) {
        if (error) {
          res.status(httpStatusCode.BAD_REQUEST).send(context.responseError (error));
          return;
        }
        return res.status(httpStatusCode.OK).send(context.responseCreate(result));
      });
    }

    delete(req, res) {
      return model.todo.delete(req.params, req.body, function(err, result) {
        if (err) {
          res.status(httpStatusCode.BAD_REQUEST).send(context.responseError(err));
          return null;
        }
        return res.status(httpStatusCode.OK).send(context.responseGet(result));
      });
    }

    update(req, res) {
      return model.todo.update(req.params, req.body, function(err, result) {
        if (err) {
          res.status(httpStatusCode.BAD_REQUEST).send(context.responseError(err));
          return null;
        }
        return res.status(httpStatusCode.OK).send(context.responseGet(result));
      });
    }

  };

  context = {};

  return Todo;

}).call(this);

module.exports = Todo;
