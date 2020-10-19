// npm imports
const _         = require('underscore');
const async     = require('async');
const validator = require('validator');


class Log {
  constructor() {
    this.environment = process.env.NODE_ENV === void 0 ? 'default' : process.env.NODE_ENV;
  }

  dev(message) {
    if (this.environment == 'local' || this.environment == 'default') {
      console.log(message)
    }
  }
}

/**
 * Formatting the error
 */
formatError = function (error, msg, code = 0) {
  if (!code) {
    code = 0;
  }
  if (!msg) {
    msg = "Error occured.";
  }
  if (error) {
    code = error.code ? error.code : code;
    if (error.errmsg) {
      msg = error.errmsg;
    } else if (error.message) {
      msg = error.message;
    }
  }
  switch (code) {
    case 11000:
      msg = "Duplicate Entry.";
  }
  return {
    error: [{
      code: code,
      message: msg
    }]
  };
};

/**
 * Validates Email
 */
validateEmail = function (value) {
  if (!validator.isEmail(value.toString().trim())) {
    return false;
  }
  return true;
};
/**
 * Password should be between 8 to 20 characters 
 * contain at least one lowercase letter, 
 * one uppercase letter, 
 * one numeric digit, 
 * one special character
 */
validatePassword = function (value) {
  reg_exp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/);
  if (reg_exp.test(value.toString().trim()) == false) {
    return false;
  }
  return true;
};

/**
 * Username should be between 3 to 25 characters 
 * contain only letters and numbers
 */
validateUsername = function (value) {
  reg_exp = new RegExp(/^[a-zA-Z0-9_]{3,25}$/);
  if (reg_exp.test(value.toString().trim().toLowerCase()) == false) {
    return false;
  }
  return true;
};


module.exports           = {
  _                      : _,
  async                  : async,
  formatError            : formatError,
  validator              : validator,
  validateEmail          : validateEmail,
  validatePassword       : validatePassword,
  validateUsername       : validateUsername
};