var db = require('../models');
var jwt = require('jsonwebtoken');

// POST: /api/user
/*Create user*/
exports.createComment = function (req, res, next) {

    var token = req.headers['x-access-token']
    var decoded = jwt.decode(token);
    var loggedInUserId = decoded[0].id;


    var commentJson = {
        body: req.body.body,
        user_id: loggedInUserId,
        blog_id: req.params.blogid
    }


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
        }
    }).then(function (blog) {
        res.send(blog);
        return next();
    });

    //return next();


};