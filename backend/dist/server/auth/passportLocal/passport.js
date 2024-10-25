"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
var passport = require('passport');
var passport_local_1 = require("passport-local");
var localAuthenticate = function (User, email, password, done) {
    User.findOne({
        email: email.toLowerCase()
    }).exec()
        .then(function (user) {
        if (!user) {
            return done(null, false, {
                message: 'This email is not registered.'
            });
        }
        else if (!user.active) {
            return done(null, false, {
                message: 'This user is inactive.'
            });
        }
        user.authenticate(password, function (authError, authenticated) {
            console.log('AUTH ERROR', password, authError, 'authenticated', authenticated);
            if (authError) {
                return done(authError);
            }
            if (!authenticated) {
                return done(null, false, { message: 'This password is incorrect.' });
            }
            else {
                return done(null, user);
            }
        });
    })
        .catch(function (err) { return done(err); });
};
var setup = function (User) {
    passport.use(new passport_local_1.Strategy({
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
    }, function (email, password, done) {
        return localAuthenticate(User, email, password, done);
    }));
};
exports.setup = setup;
//# sourceMappingURL=passport.js.map