// Please check ./models/index.js for MySQL DB Connections
// Includes
//var restify = require('restify');
var db = require('./models');
var express = require('express');
var bodyParser = require('body-parser');
// Setting Parameters to server
/*var server = restify.createServer({
  name: 'Todo',
    name: 'User'
});*/

// Initiating All Routes avaliable in ./route folder



// Using bodyparser for POST Request Parameters
//server.use(restify.bodyParser());
var app = express();
app.use(bodyParser.json());


// Routes to Function Assaignment
/*app.get('/api/todo/:id', routes.todo.getOne);
app.get('/api/todos', routes.todo.get);
app.post('/api/todos', routes.todo.post);
app.delete('/api/todos/:id', routes.todo.del);*/

//user
var routes =require('./controllers');
require('./routes')(app,routes);



 // Creating Tables or Initiating Connections
 db
.sequelize
.sync({ force: false})
.complete(function(err) {
  if (err) {
    throw err;
  } else {
    // Listening in 8080 Port
	app.listen(8080);
	console.log("Server started: http://localhost:8080/");

      
  }
});
