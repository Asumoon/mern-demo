const passport = require('passport');
import { Strategy as LocalStrategy } from 'passport-local';

const localAuthenticate = (User, email, password, done) => {
   User.findOne({
     email: email.toLowerCase()
   }).exec()
     .then(user => {
       if (!user) {
         return done(null, false, {
           message: 'This email is not registered.'
         });
       } else if (!user.active) {
         return done(null, false, {
           message: 'This user is inactive.'
         });
       }
       user.authenticate(password, (authError, authenticated) => {
         console.log('AUTH ERROR', password, authError, 'authenticated', authenticated);
         if (authError) {
           return done(authError);
         }
         if (!authenticated) {
           return done(null, false, { message: 'This password is incorrect.' });
         } else {
           return done(null, user);
         }
       });
     })
     .catch(err => done(err));
 };

export const setup = (User) => {
   passport.use(new LocalStrategy({
     usernameField: 'email',
     passwordField: 'password' // this is the virtual field on the model
   }, (email, password, done) => {
     return localAuthenticate(User, email, password, done);
   }));
 };