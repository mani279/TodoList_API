
// Class Imports
const todo        = new (require('../controllers/todo-controller'))();

// npm imports
const express     = require('express');

// local imports
const router      = express.Router();

/*
* @api {post} /todos/ Create Todo
* @apiName Create
* @apiGroup Todo
*
* @apiHeader {String} Authorization Todos authentication token: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEwX1dlZCBTZXAgMjYgMjAxOCAxOToyMzoxNSBHTVQrMDUzMCAoSVNUKSI.Qd4423KBpChmjIypVuCG_dFbT3spqsMyf07XS-2Ov6M.
* 
* @apiParam {String} title Todos title.
* @apiParam {String} description Todos description.

* 
* @apiSuccess (201) {Json} Todo information.
* @apiSuccessExample {json} Success-Response:
* 	HTTP/1.1 201 OK
* 	{
* 		"success": true,
* 		"data": [
* 			{
* 				"_id" : ObjectId("5f8d49e2f1e9ee51009858bc"),
*				"status" : true,
*				"title" : "Note1",
*				"description" : "Note1 Description",
*				"created_at" : ISODate("2020-10-19T08:10:10.664Z"),
*				"updated_at" : ISODate("2020-10-19T08:10:10.665Z"),
* 			}
* 		],
* 		"count": 1,
* 		"error": []
* 	}
* 
* @apiErrorExample {json} Error-Response:
* 	HTTP/1.1 400 Unauthorized
* 	{
* 		"success": false,
* 		"data": [],
* 		"count": 0,
* 		"error": {
* 			"code": 0,
* 			"message": "Missing fields."
* 		}
* 	}
*/
router.post('/', function(req, res) {
  return todo.create(req, res);
});

/*
* @api {get} /todos/ List Todos
* @apiName Get Todos
* @apiGroup Todo
* 
* @apiHeader {String} Authorization Todos authentication token: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEwX1dlZCBTZXAgMjYgMjAxOCAxOToyMzoxNSBHTVQrMDUzMCAoSVNUKSI.Qd4423KBpChmjIypVuCG_dFbT3spqsMyf07XS-2Ov6M.
* 
* @apiParam {String} limit Pagination limit.
* @apiParam {String} page Pagination page.
* 
* @apiSuccess (200) {Json} Todo information.
* @apiSuccessExample {json} Success-Response:
* 	{
* 		"success": true,
* 		"data": [
* 			{
* 				"_id" : ObjectId("5f8d49e2f1e9ee51009858bc"),
*				"status" : true,
*				"title" : "Note1",
*				"description" : "Note1 Description",
*				"created_at" : ISODate("2020-10-19T08:10:10.664Z"),
*				"updated_at" : ISODate("2020-10-19T08:10:10.665Z"),
* 			}
* 		],
* 		"count": 1,
* 		"error": []
* 	}
* 
*/
router.get('/', function(req, res) {
  return todo.get(req, res);
});

/*
* @api {get} /todos/:id List Todo
* @apiName Get Todo
* @apiGroup Todo
*
* @apiHeader {String} Authorization Todos authentication token: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEwX1dlZCBTZXAgMjYgMjAxOCAxOToyMzoxNSBHTVQrMDUzMCAoSVNUKSI.Qd4423KBpChmjIypVuCG_dFbT3spqsMyf07XS-2Ov6M.
*
* @apiParam {String} id Todo id.
* @apiSuccess (200) {Json} Todo information.
* @apiSuccessExample {json} Success-Response:
* 	{
* 		"success": true,
* 		"data": [
* 			{
* 				"_id" : ObjectId("5f8d49e2f1e9ee51009858bc"),
*				"status" : true,
*				"title" : "Note1",
*				"description" : "Note1 Description",
*				"created_at" : ISODate("2020-10-19T08:10:10.664Z"),
*				"updated_at" : ISODate("2020-10-19T08:10:10.665Z"),
* 			}
* 		],
* 		"count": 1,
* 		"error": []
* 	}
* 
*/
router.get('/:id', function(req, res) {
  return todo.get(req, res);
});

/*
* @api {delete} /todos/:id Delete Todo
* @apiName Delete Todo
* @apiGroup Todo
* 
* @apiHeader {String} Authorization Todos authentication token: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEwX1dlZCBTZXAgMjYgMjAxOCAxOToyMzoxNSBHTVQrMDUzMCAoSVNUKSI.Qd4423KBpChmjIypVuCG_dFbT3spqsMyf07XS-2Ov6M.
* 
* @apiParam {Array} id Todo ids.
* 
* @apiSuccess (200) {Json} Todo information.
* @apiSuccessExample {json} Success-Response:
* 	HTTP/1.1 200 OK
* 	{
* 		"success": true,
* 		"data": [],
* 		"count": 0,
* 		"error": []
* 	}
*/
router.delete('/:id', function(req, res) {
  return todo.delete(req, res);
});

/*
* @api {patch} /todos/:id Update Todo
* @apiName Update Todo
* @apiGroup Todo
* 
* @apiHeader {String} Authorization Todos authentication token: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEwX1dlZCBTZXAgMjYgMjAxOCAxOToyMzoxNSBHTVQrMDUzMCAoSVNUKSI.Qd4423KBpChmjIypVuCG_dFbT3spqsMyf07XS-2Ov6M.
* 
* @apiParam {String} id Todos id.
* 
* @apiParam {String} title Todos name .
* @apiParam {String} description Todos description.
* 
* 
* @apiSuccess (200) {Json} Todo information.
* @apiSuccessExample {json} Success-Response:
* 	HTTP/1.1 200 OK
* 	{
* 		"success": true,
* 		"data": [],
* 		"count": 0,
* 		"error": []
* 	}
*/
router.put('/:id', function(req, res) {
  return todo.update(req, res);
});



module.exports = router;