//npm imports
const bodyParser   		 = require('body-parser');
const cors          	 = require('cors');
const device        	 = require('express-device');
const express       	 = require('express');
const http          	 = require('http');
const morgan        	 = require('morgan');

//local imports
const config        	 = require('./src/config');
const httpStatusCode 	 = require('./src/lib/http-status-codes');
const responseHandler	 = require('./src/lib/response-handler');

const port          	 = parseInt(process.env.PORT, 10) || config.server.port;
const app           	 = express(); // set up the express app


// register the middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(device.capture());
app.use(morgan('dev'));


// handled invalid json exception
app.use(function(err, req, res, next) {
	if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
		const error = {};
		error.success = false;
		error.error = {
			code: httpStatusCode.BAD_REQUEST,
			message: "Invalid request.(Bad JSON)."
		}
		res.status(httpStatusCode.BAD_REQUEST).send(responseHandler.errorResponse(error));
	} else next();
});

// import routes
require('./src/routes')(app);

app.set('port', port);

var server      = http.createServer(app);


server.on('listening',function(){
    console.log('ok, server is running');
});

server.listen(port);
console.log("Server listening to port: ", port);


module.exports = app;