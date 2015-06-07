module.exports = function (app, routes,authenticate) {

    app.post('/api/blog/:blogid/comment',authenticate, routes.blog.createComment);


}