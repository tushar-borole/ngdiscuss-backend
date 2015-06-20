var db = require('../models');
var jwt = require('jsonwebtoken');
var service = require('../services');

// POST: /api/user
/*Create user*/
exports.createBlog = function (req, res, next) {

    var token = req.headers['x-access-token']
    var decoded = jwt.decode(token);
    var loggedInUserId = decoded[0].id;


    var blogJson = {
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags,
        user_id: loggedInUserId
    }


    db.Blog.create(blogJson).then(function (blog) {
        res.send(blog);
        return next();
    });

    //return next();


};

exports.getAllBlogs = function (req, res, next) {


    db.Blog.findAll({
        include: [
            {
                model: db.Comment,
                include: [db.User],
                limit:2


        },
            {
                model: db.User
        }
    ]
    }).then(function (blog) {
        var blogResponse = {
            "error": false,
            resp: blog
        }
        res.send(blogResponse);
        return next();
    });

    //return next();


};

exports.getBlogDetails = function (req, res, next) {



    db.Blog.build({
        id: req.params.blogid
    }).increment('pageview_count');

    db.Blog.findAll({
        where: {
            id: req.params.blogid
        },
        include: [db.User]
    }).then(function (blog) {
        service.utils.responseHandler(res, blog[0], "Blog successfull", false, 200);

        return next();
    });
    //return next();


};