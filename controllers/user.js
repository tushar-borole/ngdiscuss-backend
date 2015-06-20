var db = require('../models');
var service = require('../services');
var winston = require('winston');
var jwt = require('jsonwebtoken');
var config = require('../config/config.js');
var bcrypt = require('bcryptjs');
var request = require('request');

// POST: /api/user
/*Create user*/
exports.createUser = function (req, res, next) {

    var salt = bcrypt.genSaltSync(10);
    // Hash the password with the salt

    var user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    }


    db.User.create(user).then(function (todo) {
        res.send(todo);
        return next();
    });

    //return next();


};

exports.loggedInUser = function (req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;

                service.utils.responseHandler(res, decoded, "Loggedin data", false, 200);
                next();
            }
        });

    }


    //return next();


};


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
exports.login = function (req, res, next) {

    // find the user
    db.User.findAll({
        where: {
            username: req.body.username
        }
    }).then(function (data) {
        console.log("inn");
        console.log(data[0].password);
        var comparePassword = bcrypt.compareSync(req.body.password, data[0].password);
        if (comparePassword) {

            var token = jwt.sign(data, config.secret, {
                expiresInMinutes: 1440 // expires in 24 hours
            });
            console.log(data[0])
            var userData = {
                "userdata": data[0],
                "token": token
            }




            service.utils.responseHandler(res, userData, "Loggedin Successfull", false, 200);

            return next();
        } else {
            res.send({
                error: true,
                message: 'Invalid Password'
            });
            return next();
        }

    })
};

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
exports.getAllUsers = function (req, res, next) {

    // find the user
    db.User.findAll().then(function (data) {


        // return the information including token as JSON
        res.send(data);
        return next();
    })
};



exports.facebookLogin = function (req, res, next) {
    var accessTokenUrl = 'https://graph.facebook.com/v2.3/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.3/me';
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: "76b38a52346564431a4f2b3ecc4e2d6a",
        redirect_uri: req.body.redirectUri
    };

    // Step 1. Exchange authorization code for access token.
    request.get({
        url: accessTokenUrl,
        qs: params,
        json: true
    }, function (err, response, accessToken) {
        if (response.statusCode !== 200) {
            return res.status(500).send({
                message: accessToken.error.message
            });
        }

        // Step 2. Retrieve profile information about the current user.
        request.get({
            url: graphApiUrl,
            qs: accessToken,
            json: true
        }, function (err, response, profile) {

            db.User.findAll({
                where: {
                    facebook: profile.id
                }
            }).then(function (existingUser) {

                console.log(existingUser)
                if (existingUser.length !== 0) {

                    var token = jwt.sign(existingUser, config.secret, {
                        expiresInMinutes: 1440 // expires in 24 hours
                    });
                    return res.send({
                        token: token,
                        user:existingUser[0]
                    });
                }
                console.log(profile)

                var user = {
                    facebook: profile.id,
                    firstname: profile.first_name,
                    lastname: profile.last_name,
                    picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large',
                    email: profile.email
                }


                db.User.create(user).then(function (user) {
                    var token = jwt.sign(user, config.secret, {
                        expiresInMinutes: 1440 // expires in 24 hours
                    });
                    return res.send({
                        token: token,
                        user:user[0]
                    });

                });


            });

        });
    });

}