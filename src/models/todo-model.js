// Class Imports
const auth      = new(require('../core/authentication'))();
// local imports
const config    = require('../config');
const db        = require('../core/database');
const util      = require('../lib/utilities');

Schema    = db.Database.Schema;

ObjectId  = Schema.Types.Oid;

schema = new Schema({
  id: ObjectId,
  title: {
    type: String,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  collation: {
    locale: 'en_US',
    strength: 1
  }
});

Todos = db.Database.model('todos', schema);

/**
 * To Add New Todo
 * @param {*} req node request object containing body with required todo details
 * @param {*} callback 
 * @return callback function
 */
Todos.create = function(body, callback) {

    if ((!body.title ) || (!body.description)) {
        return callback({
        error: {
            code: 0,
            message: "Missing fields."
        }
        }, null);
    }
    const todo = new Todos({title: body.title, description: body.description})
    todo.save()
    .then(todo => {
      callback(null,body);
    })
    .catch(error =>  {
        return callback(util.formatError(error), null);
    });
};


Todos.get = function(queryParams, params,userData, callback) {
  var options = db.ListProcessor.process(queryParams);
  options.conditions = {};
  if (params.id) {
    options.conditions._id = db.Database.Types.ObjectId(params.id.toString());
  }
  return util.async.waterfall([
    
    // get todos
    function(callback) {
      return Todos.find(options.conditions,{},options.pagination,
    function(error,
    users) {
        if (error) {
          return callback(error,
    null);
        }
        return callback(null,
    users);
      });
    },
    
    // get count
    function(todos,
    callback) {
      Todos.countDocuments(options.conditions,
    function(error,
    count) {
        return callback(null,
    {
          data: todos,
          count: count
        });
      });
    }
  ], function(error, result) {
    return callback(error, result);
  });
};


Todos.delete = function(params, body, callback) {
  let options = {}
  options.conditions = {};

  if (params.id) {
    options.conditions._id = db.Database.Types.ObjectId(params.id.toString());
  }
  return Todos.deleteOne(options.conditions, function(error, result) {
    if (error) {

      return callback({
        error: [
          {
            code: 0,
            message: "Error occured when deleting todos."
          }
        ]
      }, null);
    }
    if (!result.n) {
      return callback({
        error: [
          {
            code: 0,
            message: "Todo does not exist."
          }
        ]
      }, null);
    }
    return callback(null, {
      data: [],
      count: result.n
    });
  });
};


Todos.update = function(params, body, callback) {
  let options = {}
  options.conditions = {};

  if (params.id) {
    options.conditions._id = db.Database.Types.ObjectId(params.id.toString());
  }
  where_obj = {
    _id: params.id
  };
  modifications_obj = {
    $set: {
      title: body.title,
      description: body.description,
      updated_at: Date.now()
    }
  };
  return Todos.updateOne(where_obj, modifications_obj, function(error, result) {
    if (error) {
      return callback(util.formatError(error, "Error in updating todos."), null);
    }
    if (!result.n && !result.nModified) {
      return callback(util.formatError(null, "Todo does not exist."), null);
    }
    return callback(null, {
      data: [true],
      count: 1
    });
  });
};

module.exports = Todos;
