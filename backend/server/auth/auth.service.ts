import Config from './../config';

import * as jwt from 'jsonwebtoken';
import * as expressJwt from 'express-jwt';
import * as compose from 'composable-middleware';
import User from './../api/user/user.model';

import * as passport from 'passport';
var randtoken = require('rand-token');
import * as _ from 'lodash';

const config = Config(process.env.NODE_ENV);
const { version: appVersion } = require(config.pkg);
const validateJwt = expressJwt({
  secret: config.secrets.session
});

const jwtUserInfo = expressJwt({
  secret: config.secrets.session,
  credentialsRequired: false
});

const injectFilter = (req, res, next) => {
  if (req.user.role === 'ADMIN') {
    req.filter = { role: { $nin: 'ADMIN' } };
  } else {
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

export default class AuthService {
  userModel = User;
  refreshTokensList = {};

  //  Local App Authentication Process
  localLogin = (req, res, next) => {
    // console.log('------------------>>> Access Ok ')
    passport.authenticate('local', (err, user, info) => {
      const error = err || info;
      if (error) {
        return res.status(401).json(error);
      }
      if (!user) {
        return res.status(404).json({ message: 'Something went wrong, please try again.' });
      }

      const projection = {
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

     this.userModel.aggregate([
        { $match: { _id: user._id } },
        { $project: projection },
     ],
        (_err, data) => {
          const _u = data[0] || {};
           req.token = AuthService.signToken(_u);
           req.tokenExpireDate = "24 Hr";
           
           req.USER_DETAIL = data;
           return next();
        });
    })(req, res, next);
  } //  Local App Authentication Process end

  // Generate Sign In Token 
  static signToken = (user) => {
    return jwt.sign({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isScrambled: config.isScrambled || false,
      active: user.active,
      passwordVerifed: true  // To Do Remaining work in future
    }, config.tokenSecrets.session, {
      expiresIn: config.tokenLife
    });
  }

  static refreshSignToken = (user) => {
    return jwt.sign({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isScrambled: config.isScrambled || false,
      active: user.active,
      passwordVerifed: true   // To Do Remaining work in future
    }, config.refreshTokenSecrets.session, {
      expiresIn: config.refreshTokenLife
    });
  }

  isAuthenticated = () => {
    return compose()
      .use((req, res, next) => {
        if (req.query && req.query.hasOwnProperty('token')) {
          req.headers.authorization = `Bearer ${req.query.token}`;
        }
        if (req.params && req.params.hasOwnProperty('token')) {
          req.headers.authorization = `Bearer ${req.params.token}`;
        }
        // if (req.query && typeof req.query.authorization !== 'undefined') {
        //   req.headers.authorization = `Bearer ${req.cookies.token}`;
        // }
        if (!req.headers.authorization) {
          return res.status(401).send({ 'Error Message': 'No Authorization Token Found' });
        }
        validateJwt(req, res, next);
      })
      .use((err, req, res, next) => {
        if (err && err.status === 401) {
          return res.status(401).send({ 'message': 'No Authorization Token Found. Please login again.' });
        }
        console.log(' req.user.incUsersId', req.user.incUsersId);
        User.findById(req.user._id).select('firstName lastName email role')
          .exec()
          .then(user => {
            if (!user) {
              return res.status(401).send({ message: 'Authentication Failed. Operation Abandoned.' });
            }
            req.incUsersId = req.user.incUsersId;
            req.user = user;

            return injectFilter(req, res, next);
          })
          .catch(err2 => next(err2));
      });
  }

  // Find Client_Email Client_Id and Client_Secret Access and generate token + refreshToken
  accessToken = (req, res, next) => {

    const u_client_id = req.body.client_id;
    const u_client_secret = req.body.client_secret;
    const u_email = req.body.email;

    const tokanExpDate = '24 Hr';

    if ((u_client_id === undefined) || (u_client_secret === undefined) || (u_email === undefined)) {
      return res.status(412).send({ message: 'Missing Email or Api Client Id or Client Secret' });
    }
    else {
      this.userModel.findOne({ 'client_id': u_client_id, 'client_secret': u_client_secret, 'email': u_email })
        .exec().then((user) => {
          if (user !== null) {
            if (!user) {
              return res.status(401).end();
            }
            else {
              req.user = user;
              // const refreshToken = randtoken.uid(256);
              // Generate Token & RefreshToken 
              const refreshToken = AuthService.refreshSignToken(user);
              const token = AuthService.signToken(user);
              const tokenExpireDate = "7 Days";

              const response = {
                "status": "Logged in",
                "token": token,
                "user": user,
                "refreshToken": refreshToken,
                "rTExpire-Day": tokenExpireDate,
              }
              this.refreshTokensList[refreshToken] = response;
              res.status(200).json(this.refreshTokensList);
            }
          } else {
            return res.status(401).send({
              message: 'API Key and Client Secret Combination did not match any record in our system'
            });
          }
        }, (reject) => {
          return res.status(500).send({
            message: 'Something went wrong. Please try again. If error persists, please contact System Administrator'
          });
        });
    }
  }

  // Get Old RefreshToken to Generate New
  refreshGrantToken = (req, res, next) => {
    const postData = req.body;
    if ((postData.refreshToken) && (postData.refreshToken in this.refreshTokensList)) {
      // console.log('++++++++++++++++++++++++++');
      // console.log(postData.refreshToken in this.refreshTokensList);
      // console.log('++++++++++++++++++++++++++');
      // var rToken: any;
      const rToken = this.refreshTokensList;
      // if(postData.refreshToken === Object.keys(rToken)[0]) {
      //   console.log(rToken.user);
      // }
      // console.log(Object.keys(rToken)[0]);

      const user = req.decoded;
      const token = AuthService.signToken(user);
      //  Updates the Token
      this.refreshTokensList[postData.refreshToken].token = token;
      return res.json({ AuthToken: token })
    }
    else {
      res.send('Unauthorized access ==> ** ** **  Server refreshToken and Requested refreshToken  ** ** ** Didnt Match');
      // res.send(401)
    }
  }

  verifyGrantToken = (req, res, next) => {
    const token = req.body.refreshToken || req.query.refreshToken || req.headers['x-access-token'];
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
    } else {
      console.log('No Token');
      // if there is no token
      return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
      });
    }
  }

  hasRoles = (roleRequired) => {
    if (!roleRequired) {
      throw new Error('Required role needs to be set');
    }

    return compose()
      .use(this.isAuthenticated())
      .use((req, res, next) => {
        let authorized = false;
        _.each(roleRequired, (role) => {
          authorized = config.userRoles.indexOf(req.user.role) === config.userRoles.indexOf(role) || authorized;
        });
        console.log('authorized', authorized, req.user.role);
        if (authorized) {
          return injectFilter(req, res, next);
          // return next();
        } else {
          return res.status(403).send({"error": true, "message": 'Forbidden' });
        }
      });
  }

  verifyRefreshToken = (req, res, next) => {
    const token = req.body.refreshToken || req.query.refreshToken || req.headers['x-access-token'];
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
    } else {
      console.log('No Token');
      // if there is no token
      return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
      });
    }
  }

  sendRefreshToken = (req, res, next) => {
    if (req.decoded) {
      // console.log('==========================');
      // console.log('++++++++++++++++++++++++++');
      // console.log(req.decoded);
      // console.log('++++++++++++++++++++++++++');     
      // console.log('==========================');
      const user = req.decoded;
      //  Generate New Token 
      const token = AuthService.signToken(user);
      return res.json({ accessToken: token, user: user })
    }
    else {
      res.send('Unauthorized access ==> ** ** ** Server refreshToken ** ** ** Didnt Match');
      // res.send(401)
    }
  }

  returnUserData = (req, res, next) => {
    const response = {
      "status": "Logged in",
      "token": req.token,
      "user": req.USER_DETAIL,
      "token-expire": req.tokenExpireDate,
    }
    res.status(200).json(response);
  }

  verifyTokenAndGetDecoded = (req, res, next) => {
    let token;
    if(req.headers && req.headers.authorization) {
      token = req.headers.authorization.replace('Bearer ',''); 
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
    } else {
      console.log('No Token');
      // if there is no token
      return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
      });
    }
  }

}
