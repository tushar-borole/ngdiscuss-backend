module.exports = function (app, routes, authenticate) {

    app.post('/api/user', routes.user.createUser);
    app.post('/api/login', routes.user.login);
    app.get('/auth/users', authenticate, routes.user.getAllUsers);
    app.get('/api/loggedInUser', authenticate, routes.user.loggedInUser);
    app.post('/auth/facebook', routes.user.facebookLogin);



}