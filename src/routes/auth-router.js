// Class Imports
const auth    = new (require('../controllers/auth-controller'))();
const user 		= new (require('../controllers/user-controller'))();

// npm imports
const express = require('express');

const router 	= express.Router();

/**
 * @api {post} /auth/login Request User Login
 * @apiName Login User
 * @apiGroup Auth
 *
 * @apiParam {String} email Users email/username.
 * @apiParam {String} password Users password.
 * 
 * @apiSuccess {Json} Token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *			"success": true,
 *			"data": {
 *			     "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InVuZGVmaW5lZF9Nb24gT2N0IDE5IDIwMjAgMTE6NDY6MjAgR01UKzA1MzAgKEluZGlhIFN0YW5kYXJkIFRpbWUpIg.m-ZzA1xcZfONykr5r-Yfo5cgdnF65vYHz3FC3jZj4rY"
 *			},
 *			"count": 1,
 *			"totalCount": 1,
 *			"error": [],
 *		}
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 * 		"success":false,
 * 		"data":{},
 * 		"count":0,
 * 		"totalCount":0,
 * 		"error":[{"code":10001,"message":"Invalid User."}]}
 */
router.post('/login', function(req, res) {
  return auth.login(req, res);
});

/**
 * @api {post} /auth/logout Request User Logout
 * @apiName Logout User
 * @apiGroup Auth
 *
 * @apiHeader {String} toke Token.
 *  
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *			"success": true,
 *			"data": {},
 *			"count": 1,
 *			"totalCount": 1,
 *			"error": [],
 *		}
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 * 		"success":false,
 * 		"data":{},
 * 		"count":0,
 * 		"totalCount":0,
 * 		"error":[{"code":401,"message":"You are not authorized to use this application."}]}
 */
router.post('/logout', function(req, res) {
  return auth.logout(req, res);
});

module.exports = router;
