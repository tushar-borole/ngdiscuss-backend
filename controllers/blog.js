var db = require('../models');
var jwt = require('jsonwebtoken');

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
        user_id:loggedInUserId
    }
    

      db.Blog.create(blogJson).success(function (blog) {
          res.send(blog);
          return next();
      });

    //return next();


};

exports.getAllBlogs = function (req, res, next) {


      db.Blog.findAll().success(function (blog) {
          res.send(blog);
          return next();
      });

    //return next();


};
