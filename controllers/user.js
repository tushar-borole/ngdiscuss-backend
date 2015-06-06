var db = require('../models');
var winston = require('winston');

// POST: /api/user
/*Create user*/
exports.post = function (req, res, next) {

console.log("inn")
    var user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    }


    db.User.create(user).success(function (todo) {
         res.send(todo);
         return next();
    });

    //return next();


};