"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// import BaseCtrl from './../base';
var role_model_1 = require("./role.model");
var nanoid_1 = require("nanoid");
var RoleCtrl = /** @class */ (function () {
    function RoleCtrl() {
        var _this = this;
        this.model = role_model_1.default;
        this.all = function (req, res) {
            var searchCriteria;
            searchCriteria = {};
            // searchCriteria.$and = searchCriteria.$and || [];
            var searchParams = req.params;
            var page = searchParams.page && Number(searchParams.page) || 1;
            var size = searchParams.size && Number(searchParams.size) || 10;
            var skip = 0;
            if (page > 1) {
                skip = page > 0 ? ((page - 1) * size) : 0;
            }
            var sort;
            var $or;
            sort = {}, $or = [];
            if (searchParams.order === 'asc') {
                if (searchParams.sort === 'undefined') {
                    sort['updatedAt'] = 1;
                }
                else {
                    sort[searchParams.sort] = 1;
                }
            }
            else {
                sort[searchParams.sort] = -1;
            }
            if (searchParams.searchText && searchParams.searchText !== 'undefined' && searchParams.searchText !== 'null' && searchParams.searchText.length > 0) {
                searchCriteria.$and = searchCriteria.$and || [];
                $or.push({
                    roleName: {
                        '$regex': '(?i).*' + searchParams.searchText + '.*'
                    }
                });
                $or.push({
                    roleId: {
                        '$regex': '(?i).*' + searchParams.searchText + '.*'
                    }
                });
                $or.push({
                    landingPage: {
                        '$regex': '(?i).*' + searchParams.searchText + '.*'
                    }
                });
                searchCriteria.$and.push({ $or: $or });
            }
            var projection = {
                _id: 1, active: 1, id: 1, type: 1, updatedAt: 1, notes: 1,
                roleId: 1, roleName: 1, userTag: 1, landingPage: 1,
                isMFA: 1, mfaType: 1, logoutURL: 1, firstLoginRedirect: 1
            };
            role_model_1.default.countDocuments(searchCriteria).exec().then(function (cnt) {
                var showNext = (size * page) < cnt;
                role_model_1.default.aggregate([{ $match: searchCriteria },
                    { $project: projection },
                    { $sort: sort },
                    { $skip: skip },
                    { $limit: size }], function (err, result) {
                    if (req.ONLY_ROLES) {
                        return res.json(result);
                    }
                    if (err) {
                        return res.status(400).send('Something went wrong. Could not fetch Information');
                    }
                    return res.json({
                        roles: result,
                        showNext: showNext,
                        page: page,
                        size: size,
                        totalCount: cnt
                    });
                    // });
                });
            }, function (err) {
                console.log(err);
                return res.status(500).send({ message: err });
            });
        };
        this.getRole = function (req, res, next) {
            role_model_1.default.findOne({ roleId: req.USER.role, active: true }, function (err, role) {
                if (!role) {
                    console.log(' *** This Role is SUSPENDED Please Contact Support Center. *** ');
                    return res.status(404).json({ message: 'This Role is SUSPENDED Please Contact Support Center.' });
                }
                req.ROLE_DETAIL = role;
                next();
            });
        };
        this.getRolesList = function (req, res, next) {
            var criteria = {};
            // let criteria: any = { parentRole : req.user.role };
            if (req.user.role === 'ADMIN') {
                criteria = {};
            }
            role_model_1.default.find(criteria, function (err, roles) {
                if (!roles) {
                    return res.status(404).json('Roles not found');
                }
                return res.json(roles);
            });
        };
        // getParticipantRoleList = (req, res, next) => {
        //     const criteria: any = { asParticipant : true };        
        //     Role.find(criteria, (err, roles) => {
        //         return res.json(roles);
        //     });
        // }
        this.getSingleRole = function (req, res, next) {
            role_model_1.default.findOne({ roleId: req.params.role }).exec().then(function (role) {
                if (!role) {
                    return res.status(404).json('Role detail not found');
                }
                return res.json(role);
            });
        };
        this.checkRoleBeforeCreating = function (req, res, next) {
            if (req.body && req.body._id) {
                return next();
            }
            else {
                role_model_1.default.findOne({ roleId: req.body.roleId }).exec().then(function (role) {
                    if (!role) {
                        return next();
                    }
                    else {
                        console.log(" *** Role ".concat(role.roleId, " Already exist please try with another Role Id *** "));
                        return res.status(404).json("Role ".concat(role.roleId, " Already exist please try with another Role Id"));
                    }
                });
            }
        };
        this.updateRole = function (req, res, next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var roleUpdate, addRole;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.body && req.body._id)) return [3 /*break*/, 2];
                        if (!req.body.roleId) {
                            return [2 /*return*/, res.status(422).json({ success: false, message: 'There is missing Role Id' })];
                        }
                        return [4 /*yield*/, role_model_1.default.updateOne({ _id: req.body._id }, {
                                roleName: req.body.roleName,
                                userTag: req.body.userTag,
                                roleId: req.body.roleId,
                                updatedAt: new Date(),
                                landingPage: req.body.landingPage,
                                firstLoginRedirect: req.body.firstLoginRedirect,
                                isMFA: req.body.isMFA,
                                logoutURL: req.body.logoutURL,
                                mfaType: req.body.mfaType,
                                type: req.body.type,
                                notes: req.body.notes,
                                active: req.body.active,
                                // access : req.body.accessRoles,
                                // hasSSO : req.body.hasSSO,
                                // asParticipant: req.body.asParticipant,
                                // parentRole : req.body.parentRole,
                                // roleMenus : req.body.roleMenus,
                                // validDays : req.body.validDays
                            })];
                    case 1:
                        roleUpdate = _a.sent();
                        if (roleUpdate && roleUpdate.nModified === 1) {
                            // return res.status(200).json({ message: 'Success! Role info has been updated successfully.' });
                            req.successMessage = 'Success! Role info has been updated successfully.';
                            return [2 /*return*/, next()];
                        }
                        return [2 /*return*/, res.status(422).json({ message: 'There is an error saving role. Please try again.' })];
                    case 2:
                        addRole = new role_model_1.default({
                            roleName: req.body.roleName,
                            userTag: req.body.userTag,
                            roleId: req.body.roleId,
                            id: (0, nanoid_1.nanoid)(8),
                            updatedAt: new Date(),
                            landingPage: req.body.landingPage,
                            firstLoginRedirect: req.body.firstLoginRedirect,
                            isMFA: req.body.isMFA,
                            logoutURL: req.body.logoutURL,
                            mfaType: req.body.mfaType,
                            type: req.body.type,
                            notes: req.body.notes,
                            // asParticipant: req.body.asParticipant,
                            // hasSSO: req.body.hasSSO,
                            // parentRole : req.body.parentRole,
                            // roleMenus : req.body.roleMenus,
                            // validDays : req.body.validDays,
                            // access : req.body.accessRoles
                        });
                        console.log('saving');
                        addRole.save(function (err2, savedDoc) {
                            console.log('save');
                            if (err2) {
                                console.log('ERROR IN SAVING ROLE');
                                console.log(err2);
                                //   return;
                                return res.status(422).json({ message: 'There is an error saving role. Please try again.', err2: err2 });
                            }
                            else {
                                req.successMessage = "Success! Saved.";
                                return next();
                            }
                            // return res.status(200).json({ 'message': 'Success! Saved.' });
                        });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateEnvironmentVariableRole = function (req, res, next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                console.log('Update Environment Variable Role todo');
                // TODO Update Env Variable roles system 
                // const oldEnvDoc = await EnvironmentVariable.findOne({});
                // console.log('oldEnvDoc:: ', JSON.stringify(oldEnvDoc));
                // // const newEnvDoc = await EnvironmentVariable.findOneAndUpdate({
                // //     "roleBasedRules.id": {
                // //             $ne: req.body.roleId //only push if array doesn't already contain
                // //         }
                // //     },
                // //     {
                // //         $push: {
                // //             roleBasedRules: {
                // //                 id: req.body.roleId,
                // //                 name: `**** Logged in user is ${req.body.roleId}****`
                // //             }
                // //         }
                // //     },
                // //     { 
                // //         new: true, //return updated doc
                // //         useFindAndModify: false // prevent using of findAndModify
                // //     }
                // // );
                return [2 /*return*/, res.status(200).json({ 'message': req.successMessage })];
            });
        }); };
        this.deleteRole = function (req, res, next) {
            console.log('------TODO------- Delete Role ');
            console.log('------TODO------- Delete Role ');
            console.log(req.query);
            console.log('------TODO------- Delete Role ');
            console.log('------TODO------- Delete Role ');
            return res.json(true);
        };
    }
    return RoleCtrl;
}());
exports.default = RoleCtrl;
//# sourceMappingURL=role.controller.js.map