var db = require('../models');
var jwt = require('jsonwebtoken');
var service = require('../services');

// POST: /api/user
/*Create user*/
exports.createComment = function (req, res, next) {

    var token = req.headers['x-access-token']
    var decoded = jwt.decode(token);
    console.log(decoded)
    var loggedInUserId = decoded[0].id;


    var commentJson = {
        body: req.body.body,
        user_id: loggedInUserId,
        blog_id: req.params.blogid
    }
    db.Blog.build({
        id: req.params.blogid
    }).increment('comment_count');

    db.Comment.create(commentJson).then(function (blog) {
        res.send(blog);
        return next();
    });
    

    //return next();


};
exports.getCommentByBlog = function (req, res, next) {


    db.Comment.findAll({
        where: {
            blog_id: req.params.blogid
        },
        include: [db.User]
    }).then(function (blog) {

        service.utils.responseHandler(res, blog, "Comment Data", false, 200);
        return next();
    });

    //return next();


};