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
  username: {
    type: String,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    trim: true
  },
  name: {
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

Users = db.Database.model('users', schema);

/**
 * To Add New User
 * @param {*} req node request object containing body with required user details
 * @param {*} callback 
 * @return callback function
 */
Users.create = function(body, callback) {

  if ((!body.username ) || (!body.email) || (!body.password)) {
    return callback({
      error: {
        code: 0,
        message: "Missing fields."
      }
    }, null);
  }

  util.async.waterfall([
    function (callback) {
      status = util.validateEmail(body.email);
      if(!status){
          return callback(util.formatError(null, "Invalid email."), null);
      } else {
          callback(null, {});
      }
    },
    function (results, callback) {
      status = util.validatePassword(body.password);
      if(!status){
          return callback(util.formatError(null, "Password should be between 8 to 20 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"), null);
      } else {
          callback(null, {});
      }
  },
  function(results,callback){
      status = util.validateUsername(body.username);
      if(!status){
          return callback(util.formatError(null, "User Name should be between 3 to 25 characters which contains only alphabets and numbers."), null);
      } else {
          callback(null, {});
      }
  },
  function (results, callback) {
      return generateHashPassword(body, callback);
  },
    function(result,callback) {
      const user = new Users({username: body.username.toLowerCase(), email: body.email.toLowerCase(), password: body.password})
      user.save()
      .then(user => {
          callback(null,body);
      })
      .catch(error =>  {
        return callback(util.formatError(error), null);
      });
    },
    function(data, callback) {
        return callback(null,{data: util._.omit(data,'Password'),count: 1});
    }
  ], 
  function(error, result) {
      return callback(error, result);
  });
};

Users.login = function(body, callback) {
  if (!body || !body.email || !body.password) {
      return callback({error: [{code: require('../lib/http-status-codes').NOT_FOUND, message: "Missing fields."}]}, null);
  }
  whereCondition = {
    $and: [
      {
        $or: [
          {email: body.email.trim().toLowerCase()},
          {username: body.email.trim().toLowerCase()}
        ]
      }
    ]
  };
  util.async.waterfall([
    function(callback) {
      return Users.findOne(whereCondition,
        function(error,
        user) {
            var code;
            if (error) {
              code = error.parent ? error.parent.code : 0;
              return callback({
                error: [
                  {
                    code: code,
                    message: error.errors[0].message
                  }
                ]
              },
        null);
            }
            if (user === null) {
              return callback({
                error: [
                  {
                    code: 10001,
                    message: "Invalid User."
                  }
                ]
              },
        null);
            }
            return callback(null,
        [user]);
          });
    },
    function(user, callback) {
      auth.comparePassword({hash: user[0].password, password: body.password.toString().trim()},function(err,res) {
          if (err) {
            return callback({error: [{code: 0,message: "Invalid login details."}]},null);
          }
          return callback(null,user);
      });
    },
    function(user, callback) {
      auth.generateToken(user[0],function(err, token) {
          if (err) {
              return callback({error: [{code: 0,message: "Invalid login details."}]},null);
          }
          const user_info = {
              "id"        : user[0].Id,
              "username"  : user[0].UserName,
              "email"     : user[0].Email,
              "token"     : token
          };
          callback(null,{data: user_info,count: 1});
      });
    }
  ], function(error, result) {
    return callback(error, result);
  });
};

/**
* Generates Password Hash
*/
generateHashPassword = function(body, callback) {
  const password = body.password.toString().trim();
  return auth.generatePassword(password, function(err, password) {
      if (err) {
          return callback(util.formatError(null, "Error in generating hash password, please try again."), null);
      }
      body.password = password;
      return callback(null, {});
  });
};
module.exports = Users;
