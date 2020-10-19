
// Class Imports
const user        = new (require('../controllers/user-controller'))();

// npm imports
const express     = require('express');

// local imports
const router      = express.Router();


/**
 * @api {post} /user/ Request User Creation
 * @apiName Create User
 * @apiGroup User
 *
 * @apiParam {String} name Users name.
 * @apiParam {String} username Users username.
 * @apiParam {String} email Users email.
 * @apiParam {String} password Users password.
 * 
 * @apiSuccess {Json} User information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *			"success": true,
 *			"data": {
 *			"name": "manisha",
 *			"email": "manisha@gmail.com",
 *			"password": "$2b$10$ml9D0DEpN4A05dYXO6ojxewIojzmkveNc8DrHmGPKaoji7pCDi7KG",
 *			"username": "manisha"
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
 * 		"error":[{"code":11000,"message":"Duplicate Entry."}]}
 */
router.post('/', function(req, res) {
    return user.create(req, res);
});


module.exports = router;