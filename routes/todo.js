// Getting all the available models in ./models
// Currently Todo Model is available
var routes =require('./controller');
// GET: /api/todos
exports.get('/api/todo/:id', routes.todo.getOne);
exports.get('/api/todos', routes.todo.get);
exports.post('/api/todos', routes.todo.post);
exports.del('/api/todos/:id', routes.todo.del);
