"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./../config");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var compose = require("composable-middleware");
var user_model_1 = require("./../api/user/user.model");
var passport = require("passport");
var randtoken = require('rand-token');
var _ = require("lodash");
var config = (0, config_1.default)(process.env.NODE_ENV);
var appVersion = require(config.pkg).version;
var validateJwt = expressJwt({
    secret: config.secrets.session
});
var jwtUserInfo = expressJwt({
    secret: config.secrets.session,
    credentialsRequired: false
});
var injectFilter = function (req, res, next) {
    if (req.user.role === 'ADMIN') {
        req.filter = { role: { $nin: 'ADMIN' } };
    }
    else {
        req.filter = { role: req.user.role };
    }
    if (req.user.role !== 'ADMIN') {
        req.filter = { _id: req.user._id };
    }
    if (req.user.role === 'ADMIN') {
        req.filter = {};
    }
    next();
};
var AuthService = /** @class */ (function () {
    function AuthService() {
        var _this = this;
        this.userModel = user_model_1.default;
        this.refreshTokensList = {};
        //  Local App Authentication Process
        this.localLogin = function (req, res, next) {
            // console.log('------------------>>> Access Ok ')
            passport.authenticate('local', function (err, user, info) {
                var error = err || info;
                if (error) {
                    return res.status(401).json(error);
                }
                if (!user) {
                    return res.status(404).json({ message: 'Something went wrong, please try again.' });
                }
                var projection = {
                    _id: 1,
                    role: 1,
                    phoneVerified: 1,
                    emailVerified: 1,
                    active: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    phoneNumber: 1,
                    state: 1,
                    country: 1,
                    createdAt: 1
                };
                _this.userModel.aggregate([
                    { $match: { _id: user._id } },
                    { $project: projection },
                ], function (_err, data) {
                    var _u = data[0] || {};
                    req.token = AuthService.signToken(_u);
                    req.tokenExpireDate = "24 Hr";
                    req.USER_DETAIL = data;
                    return next();
                });
            })(req, res, next);
        }; //  Local App Authentication Process end
        this.isAuthenticated = function () {
            return compose()
                .use(function (req, res, next) {
                if (req.query && req.query.hasOwnProperty('token')) {
                    req.headers.authorization = "Bearer ".concat(req.query.token);
                }
                if (req.params && req.params.hasOwnProperty('token')) {
                    req.headers.authorization = "Bearer ".concat(req.params.token);
                }
                // if (req.query && typeof req.query.authorization !== 'undefined') {
                //   req.headers.authorization = `Bearer ${req.cookies.token}`;
                // }
                if (!req.headers.authorization) {
                    return res.status(401).send({ 'Error Message': 'No Authorization Token Found' });
                }
                validateJwt(req, res, next);
            })
                .use(function (err, req, res, next) {
                if (err && err.status === 401) {
                    return res.status(401).send({ 'message': 'No Authorization Token Found. Please login again.' });
                }
                console.log(' req.user.incUsersId', req.user.incUsersId);
                user_model_1.default.findById(req.user._id).select('firstName lastName email role')
                    .exec()
                    .then(function (user) {
                    if (!user) {
                        return res.status(401).send({ message: 'Authentication Failed. Operation Abandoned.' });
                    }
                    req.incUsersId = req.user.incUsersId;
                    req.user = user;
                    return injectFilter(req, res, next);
                })
                    .catch(function (err2) { return next(err2); });
            });
        };
        // Find Client_Email Client_Id and Client_Secret Access and generate token + refreshToken
        this.accessToken = function (req, res, next) {
            var u_client_id = req.body.client_id;
            var u_client_secret = req.body.client_secret;
            var u_email = req.body.email;
            var tokanExpDate = '24 Hr';
            if ((u_client_id === undefined) || (u_client_secret === undefined) || (u_email === undefined)) {
                return res.status(412).send({ message: 'Missing Email or Api Client Id or Client Secret' });
            }
            else {
                _this.userModel.findOne({ 'client_id': u_client_id, 'client_secret': u_client_secret, 'email': u_email })
                    .exec().then(function (user) {
                    if (user !== null) {
                        if (!user) {
                            return res.status(401).end();
                        }
                        else {
                            req.user = user;
                            // const refreshToken = randtoken.uid(256);
                            // Generate Token & RefreshToken 
                            var refreshToken = AuthService.refreshSignToken(user);
                            var token = AuthService.signToken(user);
                            var tokenExpireDate = "7 Days";
                            var response = {
                                "status": "Logged in",
                                "token": token,
                                "user": user,
                                "refreshToken": refreshToken,
                                "rTExpire-Day": tokenExpireDate,
                            };
                            _this.refreshTokensList[refreshToken] = response;
                            res.status(200).json(_this.refreshTokensList);
                        }
                    }
                    else {
                        return res.status(401).send({
                            message: 'API Key and Client Secret Combination did not match any record in our system'
                        });
                    }
                }, function (reject) {
                    return res.status(500).send({
                        message: 'Something went wrong. Please try again. If error persists, please contact System Administrator'
                    });
                });
            }
        };
        // Get Old RefreshToken to Generate New
        this.refreshGrantToken = function (req, res, next) {
            var postData = req.body;
            if ((postData.refreshToken) && (postData.refreshToken in _this.refreshTokensList)) {
                // console.log('++++++++++++++++++++++++++');
                // console.log(postData.refreshToken in this.refreshTokensList);
                // console.log('++++++++++++++++++++++++++');
                // var rToken: any;
                var rToken = _this.refreshTokensList;
                // if(postData.refreshToken === Object.keys(rToken)[0]) {
                //   console.log(rToken.user);
                // }
                // console.log(Object.keys(rToken)[0]);
                var user = req.decoded;
                var token = AuthService.signToken(user);
                //  Updates the Token
                _this.refreshTokensList[postData.refreshToken].token = token;
                return res.json({ AuthToken: token });
            }
            else {
                res.send('Unauthorized access ==> ** ** **  Server refreshToken and Requested refreshToken  ** ** ** Didnt Match');
                // res.send(401)
            }
        };
        this.verifyGrantToken = function (req, res, next) {
            var token = req.body.refreshToken || req.query.refreshToken || req.headers['x-access-token'];
            // decode token
            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, config.refreshTokenSecrets.session, function (err, decoded) {
                    if (err) {
                        console.log('No Token Unauthorized access. ', err);
                        return res.status(401).json({ "error": true, "message": 'Unauthorized access.' });
                    }
                    console.log('req.decoded. ', req.decoded);
                    req.decoded = decoded;
                    // res.send(decoded);
                    return next();
                });
            }
            else {
                console.log('No Token');
                // if there is no token
                return res.status(403).send({
                    "error": true,
                    "message": 'No token provided.'
                });
            }
        };
        this.hasRoles = function (roleRequired) {
            if (!roleRequired) {
                throw new Error('Required role needs to be set');
            }
            return compose()
                .use(_this.isAuthenticated())
                .use(function (req, res, next) {
                var authorized = false;
                _.each(roleRequired, function (role) {
                    authorized = config.userRoles.indexOf(req.user.role) === config.userRoles.indexOf(role) || authorized;
                });
                console.log('authorized', authorized, req.user.role);
                if (authorized) {
                    return injectFilter(req, res, next);
                    // return next();
                }
                else {
                    return res.status(403).send({ "error": true, "message": 'Forbidden' });
                }
            });
        };
        this.verifyRefreshToken = function (req, res, next) {
            var token = req.body.refreshToken || req.query.refreshToken || req.headers['x-access-token'];
            // decode token
            if (token) {
                // res.send(token);
                // verifies secret and checks exp
                jwt.verify(token, config.tokenSecrets.session, function (err, decoded) {
                    if (err) {
                        console.log('No Token Unauthorized access. ', err);
                        return res.status(401).json({ "error": true, "message": 'Unauthorized access.' });
                    }
                    req.decoded = decoded;
                    return next();
                });
            }
            else {
                console.log('No Token');
                // if there is no token
                return res.status(403).send({
                    "error": true,
                    "message": 'No token provided.'
                });
            }
        };
        this.sendRefreshToken = function (req, res, next) {
            if (req.decoded) {
                // console.log('==========================');
                // console.log('++++++++++++++++++++++++++');
                // console.log(req.decoded);
                // console.log('++++++++++++++++++++++++++');     
                // console.log('==========================');
                var user = req.decoded;
                //  Generate New Token 
                var token = AuthService.signToken(user);
                return res.json({ accessToken: token, user: user });
            }
            else {
                res.send('Unauthorized access ==> ** ** ** Server refreshToken ** ** ** Didnt Match');
                // res.send(401)
            }
        };
        this.returnUserData = function (req, res, next) {
            var response = {
                "status": "Logged in",
                "token": req.token,
                "user": req.USER_DETAIL,
                "token-expire": req.tokenExpireDate,
            };
            res.status(200).json(response);
        };
        this.verifyTokenAndGetDecoded = function (req, res, next) {
            var token;
            if (req.headers && req.headers.authorization) {
                token = req.headers.authorization.replace('Bearer ', '');
            }
            // decode token
            if (token) {
                // res.send(token);
                // verifies secret and checks exp
                jwt.verify(token, config.tokenSecrets.session, function (err, decoded) {
                    if (err) {
                        console.log('No Token Unauthorized access. ', err);
                        return res.status(401).json({ "error": true, "message": 'Unauthorized access.' });
                    }
                    req.decoded = decoded;
                    return next();
                });
            }
            else {
                console.log('No Token');
                // if there is no token
                return res.status(403).send({
                    "error": true,
                    "message": 'No token provided.'
                });
            }
        };
    }
    // Generate Sign In Token 
    AuthService.signToken = function (user) {
        return jwt.sign({
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            isScrambled: config.isScrambled || false,
            active: user.active,
            passwordVerifed: true // To Do Remaining work in future
        }, config.tokenSecrets.session, {
            expiresIn: config.tokenLife
        });
    };
    AuthService.refreshSignToken = function (user) {
        return jwt.sign({
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            isScrambled: config.isScrambled || false,
            active: user.active,
            passwordVerifed: true // To Do Remaining work in future
        }, config.refreshTokenSecrets.session, {
            expiresIn: config.refreshTokenLife
        });
    };
    return AuthService;
}());
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map