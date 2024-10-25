"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = require("./user.model");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var UsersCtrl = /** @class */ (function () {
    function UsersCtrl() {
        var _this = this;
        this.userModel = user_model_1.default;
        this.users = function (req, res, next) {
            var projection = {
                _id: 1, active: 1, role: 1, phoneVerified: 1, emailVerified: 1, createdAt: 1,
                firstName: 1, lastName: 1, email: 1, phoneNumber: 1,
                state: 1, country: 1
            };
            _this.userModel.aggregate([
                { $match: {} },
                { $project: projection }
            ], function (err, result) {
                if (!err) {
                    return res.send(result);
                }
                else {
                    return res.send(err);
                }
            });
        };
        this.checkUserWithEmail = function (req, res, next) {
            // console.log('=================== New User ');
            // console.log('=====>', req.body);
            // console.log('=================== New User ');
            if (req.body.email) {
                _this.userModel.findOne({ "email": req.body.email }).exec(function (err, user) {
                    if (user) {
                        console.log('Single User', user);
                        // return res.send(user);
                        return res.status(200).json({ success: false, message: "This Email : ".concat(req.body.email, " is already Registered") });
                    }
                    else {
                        return next();
                    }
                });
            }
            else {
                return res.status(200).json({ success: false, message: 'Error !!! Email is Missing' });
            }
        };
        this.newUser = function (req, res, next) {
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
            var _user = {
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
            _this.userModel.create(_user, function (err, data) {
                if (!err) {
                    return res.status(200).json({ success: true, message: 'User Created' });
                }
                else {
                    console.log('newUser ====== Registration ======= error ', err);
                    return res.status(500).json(err);
                }
            });
        };
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
        this.user = function (req, res, next) {
            var userId = req.params.id;
            var projection = {
                _id: 1, active: 1, role: 1, phoneVerified: 1, emailVerified: 1, createdAt: 1,
                firstName: 1, lastName: 1, email: 1, phoneNumber: 1,
                state: 1, country: 1
            };
            _this.userModel.aggregate([
                { $match: { "_id": ObjectId(userId) } },
                { $project: projection }
            ], function (err, result) {
                if (!err) {
                    result = result && result[0];
                    return res.send(result);
                }
                else {
                    return res.send(err);
                }
            });
        };
        this.search = function (req, res, next) {
            var req_sort = req.query.sort;
            var req_role = req.query.role;
            var req_active = req.query.active;
            var req_client_id = req.query.client_id;
            var req_client_secret = req.query.client_secret;
            var req_firstName = req.query.firstName;
            var req_email = req.query.email;
            var req_phoneNumber = req.query.phoneNumber;
            var req_district = req.query.district;
            var req_state = req.query.state;
            var query;
            query = {};
            query.$and = [];
            if (req_role && req_role !== 'undefined') {
                query.$and.push({ role: { '$regex': '(?i).*' + req_role + '.*' } });
            }
            if (req_active && req_active !== 'undefined') {
                query.$and.push({ active: req_active });
            }
            if (req_client_id && req_client_id !== 'undefined') {
                query.$and.push({ client_id: { '$regex': '(?i).*' + req_client_id + '.*' } });
            }
            if (req_client_secret && req_client_secret !== 'undefined') {
                query.$and.push({ client_secret: { '$regex': '(?i).*' + req_client_secret + '.*' } });
            }
            if (req_firstName && req_firstName !== 'undefined') {
                query.$and.push({ firstName: { '$regex': '(?i).*' + req_firstName + '.*' } });
            }
            if (req_email && req_email !== 'undefined') {
                query.$and.push({ email: { '$regex': '(?i).*' + req_email + '.*' } });
            }
            if (req_phoneNumber && req_phoneNumber !== 'undefined') {
                query.$and.push({ phoneNumber: { '$regex': '(?i).*' + req_phoneNumber + '.*' } });
            }
            if (req_district && req_district !== 'undefined') {
                query.$and.push({ district: { '$regex': '(?i).*' + req_district + '.*' } });
            }
            if (req_state && req_state !== 'undefined') {
                query.$and.push({ state: { '$regex': '(?i).*' + req_state + '.*' } });
            }
            // Sort Technique
            var sortOrder;
            sortOrder = [];
            if (req_sort === 'asc') {
                sortOrder.push({ $natural: 1 });
            }
            else {
                sortOrder.push({ $natural: -1 });
            }
            var sortOrderfinal = sortOrder[0];
            if (query.$and.length === 0) {
                _this.userModel.find({}).limit(80).sort(sortOrderfinal).exec(function (err, user) {
                    if (!err) {
                        return res.send(user);
                    }
                    else {
                        return res.send(err);
                    }
                });
            }
            else {
                _this.userModel.find(query).sort(sortOrderfinal).exec(function (err, user) {
                    if (!err) {
                        return res.send(user);
                    }
                    else {
                        return res.send(err);
                    }
                });
            }
        };
        this.updateUser = function (req, res, next) {
            console.log('updateUser');
            _this.userModel.updateOne({ '_id': req.params.id }, {
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
            }).exec(function (err, result) {
                if (result) {
                    return res.status(200).json({ success: true });
                }
                else {
                    return res.status(200).json({ success: false });
                }
            });
        };
        this.deleteSingle = function (req, res, next) {
            var _id = req.params.id;
            _this.userModel.deleteOne({ _id: ObjectId(_id) }).exec(function (err, resp) {
                if (!err) {
                    return res.json({ status: 200, message: 'success', id: _id });
                }
                else {
                    return res.json({ status: 404, message: 'Unable to Delete', err: err, id: _id });
                }
            });
        };
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
        this.getUserFromToken = function (req, res, next) {
            var projection = {
                _id: 1, active: 1, role: 1, phoneVerified: 1, emailVerified: 1, createdAt: 1,
                firstName: 1, lastName: 1, email: 1, phoneNumber: 1,
                state: 1, country: 1
            };
            _this.userModel.aggregate([
                { $match: { _id: ObjectId(req.decoded._id) } },
                { $project: projection }
            ], function (err, result) {
                if (!err) {
                    return res.send(result[0]);
                }
                else {
                    return res.send(err);
                }
            });
        };
    }
    return UsersCtrl;
}());
exports.default = UsersCtrl;
//# sourceMappingURL=user.controller.js.map