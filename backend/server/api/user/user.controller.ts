import User from './user.model';
import Config from '../../config';
// const shortid = require('shortid');
import * as shortid from 'shortid';
import * as mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export default class UsersCtrl {
   userModel = User;

   users = (req, res, next) => {
      const projection = {
         _id: 1, active: 1, role: 1, phoneVerified: 1, emailVerified: 1, createdAt: 1,
         firstName: 1, lastName: 1, email: 1, phoneNumber: 1,
         state: 1, country: 1
      };

      this.userModel.aggregate([
         { $match: {} },
         { $project: projection }
      ],
         (err, result) => {
            if (!err) {
               return res.send(result);
            }
            else {
               return res.send(err);
            }
         });
   }

   checkUserWithEmail = (req, res, next) => {
      // console.log('=================== New User ');
      // console.log('=====>', req.body);
      // console.log('=================== New User ');

      if (req.body.email) {
         this.userModel.findOne({ "email": req.body.email }).exec((err, user) => {
            if (user) {
               console.log('Single User', user);
               // return res.send(user);
               return res.status(200).json({ success: false, message: `This Email : ${req.body.email} is already Registered` });
            }
            else {
               return next();
            }
         })
      }
      else {
         return res.status(200).json({ success: false, message: 'Error !!! Email is Missing' });
      }
   }

   newUser = (req, res, next) => {

      // String Secret
      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
      var string_length = 10;
      var c_result_secret = '';
      for (var i = 0; i < string_length; i++) {
         var rstring = Math.floor(Math.random() * chars.length);
         c_result_secret += chars.substring(rstring, rstring + 1);
      }
      // End String Secret


      // Number Id
      var number_length = 20;
      var c_result_id = '';
      for (var i = 0; i < number_length; i++) {
         var rnum = Math.floor(Math.random() * chars.length);
         c_result_id += chars.substring(rnum, rnum + 1);
      }
      // end Number Id

      const _user = {
         client_id: c_result_id,
         client_secret: c_result_secret,
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         role: req.body.role,
         email: req.body.email,
         password: req.body.password,
         phoneNumber: req.body.phoneNumber,
         address: req.body.address,
         state: req.body.state,
         country: req.body.country,
         refrralCode: req.refrralCode,
      };

      this.userModel.create(_user, (err, data) => {
         if (!err) {
            return res.status(200).json({ success: true, message: 'User Created' });
         }
         else {
            console.log('newUser ====== Registration ======= error ', err);
            return res.status(500).json(err);
         }
      });
   }

   // getRefralBonusFromEnv = (req, res, next) => {

   //    req.refrralBCoin = {
   //       amount: 100.00,
   //       amountHistry: [
   //          {
   //             amount: 100.00,
   //             description: 'New User Bonus',
   //             tags: ['REG_BONUS']
   //          }
   //       ]
   //    }

   //    req.REFRRALED_USER_BONUS_COIN = req.REFRRALED_USER_BONUS_COIN + 100;

   //    return next();

   // }

   // updateRefralBonus = (req, res, next) => {
   //    const addToHistry = req.refrralBCoin.amountHistry[0];
   //    this.userModel.updateOne({ _id: req.REFRRALED_USER._id },
   //       {
   //          $set: {
   //             'bonusCoin.amount': req.REFRRALED_USER_BONUS_COIN
   //          }
   //       }, (error, response) => {
   //          // console.log('updateRefralBonus --- error ---> ', error);
   //          if (!error) {}
   //       });
   // }

   user = (req, res, next) => {
      const userId = req.params.id;
      const projection = {
         _id: 1, active: 1, role: 1, phoneVerified: 1, emailVerified: 1, createdAt: 1,
         firstName: 1, lastName: 1, email: 1, phoneNumber: 1,
         state: 1, country: 1
      };

      this.userModel.aggregate([
         { $match: { "_id": ObjectId(userId) } },
         { $project: projection }
      ],
         (err, result) => {
            if (!err) {
               result = result && result[0];
               return res.send(result);
            }
            else {
               return res.send(err);
            }
         });
   }

   search = (req, res, next) => {

      const req_sort = req.query.sort;
      const req_role = req.query.role;
      const req_active = req.query.active;
      const req_client_id = req.query.client_id;
      const req_client_secret = req.query.client_secret;
      const req_firstName = req.query.firstName;
      const req_email = req.query.email;
      const req_phoneNumber = req.query.phoneNumber;
      const req_district = req.query.district;
      const req_state = req.query.state;

      let query: any;
      query = {};
      query.$and = [];

      if (req_role && req_role !== 'undefined') {
         query.$and.push({ role: { '$regex': '(?i).*' + req_role + '.*' } })
      }
      if (req_active && req_active !== 'undefined') {
         query.$and.push({ active: req_active })
      }
      if (req_client_id && req_client_id !== 'undefined') {
         query.$and.push({ client_id: { '$regex': '(?i).*' + req_client_id + '.*' } })
      }
      if (req_client_secret && req_client_secret !== 'undefined') {
         query.$and.push({ client_secret: { '$regex': '(?i).*' + req_client_secret + '.*' } })
      }
      if (req_firstName && req_firstName !== 'undefined') {
         query.$and.push({ firstName: { '$regex': '(?i).*' + req_firstName + '.*' } })
      }
      if (req_email && req_email !== 'undefined') {
         query.$and.push({ email: { '$regex': '(?i).*' + req_email + '.*' } })
      }
      if (req_phoneNumber && req_phoneNumber !== 'undefined') {
         query.$and.push({ phoneNumber: { '$regex': '(?i).*' + req_phoneNumber + '.*' } })
      }
      if (req_district && req_district !== 'undefined') {
         query.$and.push({ district: { '$regex': '(?i).*' + req_district + '.*' } })
      }
      if (req_state && req_state !== 'undefined') {
         query.$and.push({ state: { '$regex': '(?i).*' + req_state + '.*' } })
      }

      // Sort Technique
      let sortOrder: any;
      sortOrder = [];
      if (req_sort === 'asc') {
         sortOrder.push({ $natural: 1 })
      } else {
         sortOrder.push({ $natural: -1 })
      }
      const sortOrderfinal = sortOrder[0];

      if (query.$and.length === 0) {
         this.userModel.find({}).limit(80).sort(sortOrderfinal).exec((err, user) => {
            if (!err) {
               return res.send(user);
            }
            else {
               return res.send(err);
            }
         })

      } else {
         this.userModel.find(query).sort(sortOrderfinal).exec((err, user) => {
            if (!err) {
               return res.send(user);
            }
            else {
               return res.send(err);
            }
         })
      }
   }

   updateUser = (req, res, next) => {
      console.log('updateUser');
      this.userModel.updateOne({ '_id': req.params.id }, {
         '$set': {
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'role': req.body.role,
            'phoneNumber': req.body.phoneNumber,
            'phoneVerified': req.body.phoneVerified,
            'emailVerified': req.body.emailVerified,
            'active': req.body.active,
            'address': req.body.address,
            'state': req.body.state,
            'country': req.body.country,
            'updatedBy': req.user && req.user._id || null,
            updatedAt: new Date(),
         }
      }).exec((err, result) => {
         if (result) {
            return res.status(200).json({ success: true });
         }
         else {
            return res.status(200).json({ success: false });
         }
      });
   }

   deleteSingle = (req, res, next) => {
      const _id = req.params.id;
      this.userModel.deleteOne({ _id: ObjectId(_id) }).exec((err, resp) => {
         if (!err) {
            return res.json({ status: 200, message: 'success', id: _id });
         }
         else {
            return res.json({ status: 404, message: 'Unable to Delete', err: err, id: _id });
         }
      });
   }

   // notificationEntry = async (doc, createdBy, log, tag, statusCode, actualError, callback) => {
   //    if (!log) {
   //       return;
   //    }

   //    let user;
   //    let username = 'System Update';
   //    let docId;

   //    if (createdBy) {
   //       await User.findOne({ _id: createdBy }, { lastName: 1, firstName: 1 }).exec((err, data) => {
   //          if (err) {
   //             console.log('Notification --> User Unavailable ', err);
   //          }
   //          user = data;
   //       });
   //    }

   //    if (user) {
   //       username = user.firstName + ' ' + user.lastName;
   //    }

   //    if(doc && doc._id) {
   //       docId = doc._id;
   //    }

   //    const notificationLog = new NotificationLog({
   //       createdFor: docId,
   //       log: log,
   //       createdAt: new Date,
   //       user: username,
   //       createdBy: createdBy,
   //       tag: tag
   //    });

   //    notificationLog.save((err2, savedDoc) => {
   //       if (err2) {
   //          console.log(err2);
   //          return;
   //       }
   //    });
   // }

   getUserFromToken = (req, res, next) => {
      const projection = {
         _id: 1, active: 1, role: 1, phoneVerified: 1, emailVerified: 1, createdAt: 1,
         firstName: 1, lastName: 1, email: 1, phoneNumber: 1,
         state: 1, country: 1
      };

      this.userModel.aggregate([
         { $match: {_id : ObjectId(req.decoded._id)} },
         { $project: projection }
      ],
         (err, result) => {
            if (!err) {
               return res.send(result[0]);
            }
            else {
               return res.send(err);
            }
         });
   }
}