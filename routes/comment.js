module.exports = function (app, routes,authenticate) {

    app.post('/api/blog/:blogid/comment',authenticate, routes.comment.createComment);
     app.get('/api/blog/:blogid/comment', routes.comment.getCommentByBlog);


}