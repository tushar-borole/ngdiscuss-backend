module.exports = function (app, routes,authenticate) {

    app.post('/api/blog',authenticate, routes.blog.createBlog);
     app.get('/api/blog',routes.blog.getAllBlogs);



}