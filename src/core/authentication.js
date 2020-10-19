// npm imports
const bcrypt  = require('bcrypt');
const jwt     = require('jwt-simple');

// local imports
const config  = require('../config/');

authentication = class Authentication {
  
  constructor() {}

 /**
  * Generates Encrypted Password from given text
  * 
  * @param {*} passwordText - Raw Pasword Captured from User input 
  * @param {*} callback - callback function with generated password 
  */
  generatePassword(passwordText, callback) {
    return bcrypt.hash(passwordText, config.server.saltRounds, function(err, hash) {
      return callback (err, err ? null : hash)
    });
  }

 /**
  * Generates token from the use information supplied 
  * 
  * @param {*} userInfo - User information Captured
  * @param {*} callback - Callback function with generated token
  */
  generateToken(userInfo, callback) {
    return callback(null, jwt.encode(userInfo.Id + '_' + new Date(), config.server.salt));
  }

 /**
  * Validates the password
  * 
  * @param {*} comparisonObject - { hash: saved password, password: user input }
  * @param {*} callback - callback function with comparision result
  */
  comparePassword(comparisonObject, callback) {
    if (typeof comparisonObject !== 'object' || comparisonObject.password === void 0 || comparisonObject.hash === void 0) {
      return callback("Invalid password", null);
    }
    return bcrypt.compare(comparisonObject.password, comparisonObject.hash, function(err, res) {
      if ( err || res !== true) {
        return callback("Invalid login.", null);
      }
      return callback(null, comparisonObject);
    });
  }

  /**
   *  Returns the token 
   * 
   * @param {*} headers - Header info 
   */
  getToken(headers) {
    if (headers && headers.authorization) {
      const parted = headers.authorization.split(' ');
      if (parted.length !== 2 || parted[0] !== 'Bearer') {
        return null;
      }
      return parted[1];
    } else {
      return null;
    }
  }

  /**
   *  Returns the token 
   * 
   * @param {*} headers - Header info 
   */
  static getUserToken(headers) {
    if (headers && headers.authorization) {
      const parted = headers.authorization.split(' ');
      if (parted.length !== 2 || parted[0] !== 'Bearer') {
        return null;
      }
      return parted[1];
    } else {
      return null;
    }
  }

  /**
   * Retrieves user id from decoded token 
   * 
   * @param {*} decodedToken - Token Retrieved 
   */
  static getUserIdFromDecodedUserToken(decodedToken) {
    return decodedToken.split('_')[0];
  }

  /**
   * Retrieves user id from decoded token 
   * 
   * @param {*} decodedToken - Token Retrieved 
   */
  getUserIdFromDecodedToken(decodedToken) {
    return decodedToken.split('_')[0];
  }

  /**
   * Decodes the token
   * @param {*} token - Token to be decoded
   * @param {*} callback 
   */
  decodeToken(token, callback){
    return jwt.decode(token, config.server.salt)
  }

};

module.exports = authentication;
