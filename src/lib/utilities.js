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
module.exports           = {
  _                      : _,
  async                  : async,
  validator              : validator
};