"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var resume_model_1 = require("./resume.model");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var uploader_controller_1 = require("../uploader/uploader.controller");
var uploaderController = new uploader_controller_1.default();
var ResumeController = /** @class */ (function () {
    function ResumeController() {
        var _this = this;
        this.model = resume_model_1.default;
        this.getDetail = function (req, res, next) {
            var code = req.params.code || null;
            // console.log('---> ', code);
            _this.model.find({ active: true, code: code }).sort({ createdAt: 1 }).exec(function (_err, data) {
                if (!_err) {
                    return res.json({ status: 200, message: 'success', data: data });
                }
                else {
                    return res.json({ status: 204, message: 'Unable to create', data: data });
                }
            });
        };
        this.getActiveCode = function (req, res, next) {
            var code = req.params.code || null;
            var availableCode = ['2024-resume', 'benekiva-resume', '2025-resume', 'latest'];
            var codeResult = availableCode.includes(code);
            return res.json({ status: 200, result: codeResult });
        };
        this.getSingleDetail = function (req, res, next) {
            _this.model.findById(req.params.id).sort({ createdAt: 1 }).exec(function (_err, data) {
                if (!_err) {
                    return res.json({ status: 200, message: 'success', data: data });
                }
                else {
                    return res.json({ status: 204, message: 'Unable to get lists', data: data });
                }
            });
        };
        this.createNew = function (req, res, _next) {
            var _resume = {
                createdBy: req.user && req.user._id || null,
                name: req.body.name,
                role: req.body.role,
                careerSummary: req.body.careerSummary,
                intro: req.body.intro,
                longIntro: req.body.longIntro,
                description: req.body.description,
                image: req.body.image,
                siteUrl: req.body.siteUrl,
                copyrightText: req.body.copyrightText,
                experience: req.body.experience,
                skills: req.body.skills,
                education: req.body.education,
                awards: req.body.awards,
                interests: req.body.interests,
                language: req.body.language,
                projects: req.body.projects,
                contact: req.body.contact,
                socialMedia: req.body.socialMedia
            };
            _this.model.create(_resume, function (err, _data) {
                if (!err) {
                    return res.json({ status: 200, message: 'success', data: _resume });
                }
                else {
                    return res.json({ status: 204, message: 'Unable to create', err: err, data: _resume });
                }
            });
        };
        this.createNewContact = function (req, res, _next) {
            console.log(req.body);
            console.log('------>>> ', req.params.resumeId);
            _this.model.updateOne({ '_id': ObjectId(req.params.resumeId) }, {
                $set: {
                    updatedBy: req.user && req.user._id || null,
                    updatedAt: new Date()
                },
                $push: {
                    contact: req.body
                }
            }).exec(function (err, _data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var updateData;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.model.findOne({ _id: ObjectId(req.params.resumeId) }).exec()];
                        case 1:
                            updateData = _a.sent();
                            if (!err) {
                                return [2 /*return*/, res.json({ status: 200, message: 'success', data: updateData })];
                            }
                            else {
                                return [2 /*return*/, res.json({ status: 204, message: 'Unable to create', err: err })];
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        this.createNewSocialMedia = function (req, res, _next) {
            _this.model.updateOne({ '_id': ObjectId(req.params.resumeId) }, {
                $set: {
                    updatedBy: req.user && req.user._id || null,
                    updatedAt: new Date()
                },
                $push: {
                    socialMedia: req.body
                }
            }).exec(function (err, _data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var updateData;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.model.findOne({ _id: ObjectId(req.params.resumeId) }).exec()];
                        case 1:
                            updateData = _a.sent();
                            if (!err) {
                                return [2 /*return*/, res.json({ status: 200, message: 'success', data: updateData })];
                            }
                            else {
                                return [2 /*return*/, res.json({ status: 204, message: 'Unable to create', err: err })];
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        this.updateSingle = function (req, res, _next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _id;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                _id = req.params.id;
                // console.log('*****---> ', req.body.experience)
                this.model.updateOne({ '_id': ObjectId(_id) }, {
                    $set: {
                        updatedBy: req.user && req.user._id || null,
                        updatedAt: new Date(),
                        active: req.body.active,
                        name: req.body.name,
                        role: req.body.role,
                        careerSummary: req.body.careerSummary,
                        intro: req.body.intro,
                        longIntro: req.body.longIntro,
                        description: req.body.description,
                        image: req.body.image,
                        siteUrl: req.body.siteUrl,
                        copyrightText: req.body.copyrightText,
                        experience: req.body.experience,
                        skills: req.body.skills,
                        education: req.body.education,
                        awards: req.body.awards,
                        interests: req.body.interests,
                        language: req.body.language,
                        projects: req.body.projects,
                        contact: req.body.contact,
                        socialMedia: req.body.socialMedia
                    }
                }).exec(function (err, _data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var updateData;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.model.findOne({ _id: ObjectId(_id) }).exec()];
                            case 1:
                                updateData = _a.sent();
                                if (!err) {
                                    return [2 /*return*/, res.json({ status: 200, message: 'success', data: updateData })];
                                }
                                else {
                                    return [2 /*return*/, res.json({ status: 204, message: 'Unable to create', err: err })];
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.deleteSingleSocialMedia = function (req, res, _next) {
            _this.model.find({ 'socialMedia._id': { _id: ObjectId(req.params.id) } }).exec(function (_err, data) {
                if (!_err && data && data[0]) {
                    _this.model.updateOne({ _id: data[0]._id }, {
                        '$pull': { 'socialMedia': { '_id': req.params.id } },
                    }).exec(function (err, _resp) {
                        if (!err) {
                            return res.json({ status: 200, message: 'success' });
                        }
                        else {
                            return res.json({ status: 404, message: 'Unable to Delete', err: err });
                        }
                    });
                }
                else {
                    return res.json({ status: 204, message: 'Unable to find Data' });
                }
            });
        };
        this.deleteSingleContact = function (req, res, _next) {
            _this.model.find({ 'contact._id': { _id: ObjectId(req.params.id) } }).exec(function (_err, data) {
                if (!_err && data && data[0]) {
                    _this.model.updateOne({ _id: data[0]._id }, {
                        '$pull': { 'contact': { '_id': req.params.id } },
                    }).exec(function (err, _resp) {
                        if (!err) {
                            return res.json({ status: 200, message: 'success' });
                        }
                        else {
                            return res.json({ status: 404, message: 'Unable to Delete', err: err });
                        }
                    });
                }
                else {
                    return res.json({ status: 204, message: 'Unable to find Data' });
                }
            });
        };
        this.deleteSingleEducation = function (req, res, _next) {
            _this.model.find({ 'education._id': { _id: ObjectId(req.params.id) } }).exec(function (_err, data) {
                if (!_err && data && data[0]) {
                    _this.model.updateOne({ _id: data[0]._id }, {
                        '$pull': { 'education': { '_id': req.params.id } },
                    }).exec(function (err, _resp) {
                        if (!err) {
                            return res.json({ status: 200, message: 'success' });
                        }
                        else {
                            return res.json({ status: 404, message: 'Unable to Delete', err: err });
                        }
                    });
                }
                else {
                    return res.json({ status: 204, message: 'Unable to find Data' });
                }
            });
        };
        this.deleteSingleExperience = function (req, res, _next) {
            _this.model.find({ 'experience._id': { _id: ObjectId(req.params.id) } }).exec(function (_err, data) {
                if (!_err && data && data[0]) {
                    _this.model.updateOne({ _id: data[0]._id }, {
                        '$pull': { 'experience': { '_id': req.params.id } },
                    }).exec(function (err, _resp) {
                        if (!err) {
                            return res.json({ status: 200, message: 'success' });
                        }
                        else {
                            return res.json({ status: 404, message: 'Unable to Delete', err: err });
                        }
                    });
                }
                else {
                    return res.json({ status: 204, message: 'Unable to find Data' });
                }
            });
        };
        this.deleteSingleProjects = function (req, res, _next) {
            _this.model.find({ 'projects._id': { _id: ObjectId(req.params.id) } }).exec(function (_err, data) {
                if (!_err && data && data[0]) {
                    _this.model.updateOne({ _id: data[0]._id }, {
                        '$pull': { 'projects': { '_id': req.params.id } },
                    }).exec(function (err, _resp) {
                        if (!err) {
                            return res.json({ status: 200, message: 'success' });
                        }
                        else {
                            return res.json({ status: 404, message: 'Unable to Delete', err: err });
                        }
                    });
                }
                else {
                    return res.json({ status: 204, message: 'Unable to find Data' });
                }
            });
        };
        this.deleteSingleAwards = function (req, res, _next) {
            _this.model.find({ 'awards._id': { _id: ObjectId(req.params.id) } }).exec(function (_err, data) {
                if (!_err && data && data[0]) {
                    _this.model.updateOne({ _id: data[0]._id }, {
                        '$pull': { 'awards': { '_id': req.params.id } },
                    }).exec(function (err, _resp) {
                        if (!err) {
                            return res.json({ status: 200, message: 'success' });
                        }
                        else {
                            return res.json({ status: 404, message: 'Unable to Delete', err: err });
                        }
                    });
                }
                else {
                    return res.json({ status: 204, message: 'Unable to find Data' });
                }
            });
        };
        this.deleteSingle = function (req, res, next) {
            var _id = req.params.id;
            _this.model.deleteOne({ _id: ObjectId(_id) }).exec(function (err, resp) {
                if (!err) {
                    return res.json({ status: 200, message: 'success', id: _id });
                }
                else {
                    return res.json({ status: 404, message: 'Unable to Delete', err: err, id: _id });
                }
            });
        };
        this.updateContactList = function (req, res, next) {
            _this.model.updateOne({ active: true, 'contact._id': new ObjectId(req.params.id) }, {
                $set: {
                    'contact.$.updatedBy': req.user && req.user._id || null,
                    'contact.$.updatedOn': new Date(),
                    'contact.$.name': req.body.name,
                    'contact.$.logoURL': req.body.logoURL,
                    'contact.$.landingLink': req.body.landingLink,
                    'contact.$.icon': req.body.icon,
                }
            }).exec(function (err, nfl) {
                if (!err) {
                    return res.status(200).json({ success: true });
                }
            });
        };
        // createContactList = (req, res, next) => {
        //     this.model.updateOne({ active: true }, {
        //         $push: {
        //             'contact': {
        //                 createdBy: req.user && req.user._id || null,
        //                 name: req.body.name,
        //                 logoURL: req.body.logoURL,
        //                 landingLink: req.body.landingLink,
        //             }
        //         }
        //     }).exec((err, result) => {
        //         if (err) {
        //             console.log(err);
        //             return res.status(200).json({ success: false, message: 'Unable to update Contact' });
        //         }
        //         return res.status(200).json({ success: true, message: 'Notification list added' });
        //     });
        // }
        this.updateSocialMediaList = function (req, res, next) {
            _this.model.updateOne({ active: true, 'contact._id': new ObjectId(req.params.id) }, {
                $set: {
                    'contact.$.updatedBy': req.user && req.user._id || null,
                    'contact.$.updatedOn': new Date(),
                    'contact.$.name': req.body.name,
                    'contact.$.logoURL': req.body.logoURL,
                    'contact.$.landingLink': req.body.landingLink,
                }
            }).exec(function (err, nfl) {
                if (!err) {
                    return res.status(200).json({ success: true });
                }
            });
        };
        // createSocialMediaList = (req, res, next) => {
        //     this.model.updateOne({ active: true }, {
        //         $push: {
        //             'contact': {
        //                 createdBy: req.user && req.user._id || null,
        //                 name: req.body.name,
        //                 logoURL: req.body.logoURL,
        //                 landingLink: req.body.landingLink,
        //             }
        //         }
        //     }).exec((err, result) => {
        //         if (err) {
        //             console.log(err);
        //             return res.status(200).json({ success: false, message: 'Unable to update Contact' });
        //         }
        //         return res.status(200).json({ success: true, message: 'Notification list added' });
        //     });
        // }
        this.createNewEducation = function (req, res, _next) {
            _this.model.updateOne({ '_id': ObjectId(req.params.resumeId) }, {
                $set: {
                    updatedBy: req.user && req.user._id || null,
                    updatedAt: new Date()
                },
                $push: {
                    education: req.body
                }
            }).exec(function (err, _data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var updateData;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.model.findOne({ _id: ObjectId(req.params.resumeId) }).exec()];
                        case 1:
                            updateData = _a.sent();
                            if (!err) {
                                return [2 /*return*/, res.json({ status: 200, message: 'success', data: updateData })];
                            }
                            else {
                                return [2 /*return*/, res.json({ status: 204, message: 'Unable to create', err: err })];
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        this.createNewExperience = function (req, res, _next) {
            _this.model.updateOne({ '_id': ObjectId(req.params.resumeId) }, {
                $set: {
                    updatedBy: req.user && req.user._id || null,
                    updatedAt: new Date()
                },
                $push: {
                    experience: req.body
                }
            }).exec(function (err, _data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var updateData;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.model.findOne({ _id: ObjectId(req.params.resumeId) }).exec()];
                        case 1:
                            updateData = _a.sent();
                            if (!err) {
                                return [2 /*return*/, res.json({ status: 200, message: 'success', data: updateData })];
                            }
                            else {
                                return [2 /*return*/, res.json({ status: 204, message: 'Unable to create', err: err })];
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        this.createNewProjects = function (req, res, _next) {
            _this.model.updateOne({ '_id': ObjectId(req.params.resumeId) }, {
                $set: {
                    updatedBy: req.user && req.user._id || null,
                    updatedAt: new Date()
                },
                $push: {
                    projects: req.body
                }
            }).exec(function (err, _data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var updateData;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.model.findOne({ _id: ObjectId(req.params.resumeId) }).exec()];
                        case 1:
                            updateData = _a.sent();
                            if (!err) {
                                return [2 /*return*/, res.json({ status: 200, message: 'success', data: updateData })];
                            }
                            else {
                                return [2 /*return*/, res.json({ status: 204, message: 'Unable to create', err: err })];
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        this.createNewAwards = function (req, res, _next) {
            _this.model.updateOne({ '_id': ObjectId(req.params.resumeId) }, {
                $set: {
                    updatedBy: req.user && req.user._id || null,
                    updatedAt: new Date()
                },
                $push: {
                    awards: req.body
                }
            }).exec(function (err, _data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var updateData;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.model.findOne({ _id: ObjectId(req.params.resumeId) }).exec()];
                        case 1:
                            updateData = _a.sent();
                            if (!err) {
                                return [2 /*return*/, res.json({ status: 200, message: 'success', data: updateData })];
                            }
                            else {
                                return [2 /*return*/, res.json({ status: 204, message: 'Unable to create', err: err })];
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        this.getResumeForSkillsUpdate = function (req, res, next) {
            _this.model.findById(ObjectId(req.params.resumeId)).exec(function (_err, data) {
                if (!_err) {
                    req.RESUME_DATA = data;
                    return next();
                }
                else {
                    return res.json({ status: 204, message: 'Invalid Id' });
                }
            });
        };
        this.updateSkills = function (req, res, _next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var resumeDoc;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                resumeDoc = req.RESUME_DATA;
                if (resumeDoc) {
                    resumeDoc.skills = req.body || {};
                    this.model.updateOne({ '_id': ObjectId(req.params.resumeId) }, resumeDoc).exec(function (err, _data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var updateData;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.model.findOne({ _id: ObjectId(req.params.resumeId) }).exec()];
                                case 1:
                                    updateData = _a.sent();
                                    if (!err) {
                                        return [2 /*return*/, res.json({ status: 200, message: 'success', data: updateData })];
                                    }
                                    else {
                                        return [2 /*return*/, res.json({ status: 204, message: 'Unable to create', err: err })];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                else {
                    return [2 /*return*/, res.json({ status: 204, message: "Data is not available with this id ".concat(req.params.resumeId) })];
                }
                return [2 /*return*/];
            });
        }); };
    }
    return ResumeController;
}());
exports.default = ResumeController;
//# sourceMappingURL=resume.controller.js.map