"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var settings_model_1 = require("./settings.model");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var uploader_controller_1 = require("../uploader/uploader.controller");
var uploaderController = new uploader_controller_1.default();
var SettingsController = /** @class */ (function () {
    function SettingsController() {
        var _this = this;
        this.model = settings_model_1.default;
        this.getDetail = function (req, res, next) {
            _this.model.find({}).sort({ createdAt: 1 }).exec(function (_err, data) {
                if (!_err) {
                    return res.json({ status: 200, message: 'success', data: data });
                }
                else {
                    return res.json({ status: 204, message: 'Unable to create', data: data });
                }
            });
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
        this.createNew = function (req, res, next) {
            var _faq = {
                createdBy: req.user && req.user._id || null,
                category: req.body.category,
                faqQuestion: req.body.faqQuestion,
                faqSolution: req.body.faqSolution,
                isFAQCategory: req.body.isFAQCategory,
            };
            _this.model.create(_faq, function (err, data) {
                if (!err) {
                    return res.json({ status: 200, message: 'success', data: _faq });
                }
                else {
                    return res.json({ status: 204, message: 'Unable to create', err: err, data: _faq });
                }
            });
        };
        this.updateSingle = function (req, res, next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _id, updateData;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req.params.id;
                        return [4 /*yield*/, this.model.findOne({ _id: ObjectId(_id) }).exec()];
                    case 1:
                        updateData = _a.sent();
                        this.model.updateOne({ '_id': updateData._id }, {
                            $set: {
                                updatedBy: req.user && req.user._id || null,
                                updatedAt: new Date(),
                                category: req.body.category,
                                faqQuestion: req.body.faqQuestion,
                                faqSolution: req.body.faqSolution,
                                isFAQCategory: req.body.isFAQCategory,
                            }
                        }).exec(function (err, data) {
                            if (!err) {
                                return res.json({ status: 200, message: 'success', data: updateData });
                            }
                            else {
                                return res.json({ status: 204, message: 'Unable to create', err: err, data: updateData });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        this.deleteSingleSocialMedia = function (req, res, next) {
            //    const _id = req.params.id;
            //    this.model.deleteOne({ _id: ObjectId(_id) }).exec((err, resp) => {
            //        if (!err) {
            //            return res.json({ status: 200, message: 'success', id: _id });
            //        }
            //        else {
            //            return res.json({ status: 404, message: 'Unable to Delete', err: err, id: _id });
            //        }
            //    });
        };
        this.deleteSingleContact = function (req, res, next) {
            //    const _id = req.params.id;
            //    this.model.deleteOne({ _id: ObjectId(_id) }).exec((err, resp) => {
            //        if (!err) {
            //            return res.json({ status: 200, message: 'success', id: _id });
            //        }
            //        else {
            //            return res.json({ status: 404, message: 'Unable to Delete', err: err, id: _id });
            //        }
            //    });
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
                }
            }).exec(function (err, nfl) {
                if (!err) {
                    return res.status(200).json({ success: true });
                }
            });
        };
        this.createContactList = function (req, res, next) {
            _this.model.updateOne({ active: true }, {
                $push: {
                    'contact': {
                        createdBy: req.user && req.user._id || null,
                        name: req.body.name,
                        logoURL: req.body.logoURL,
                        landingLink: req.body.landingLink,
                    }
                }
            }).exec(function (err, result) {
                if (err) {
                    console.log(err);
                    return res.status(200).json({ success: false, message: 'Unable to update Contact' });
                }
                return res.status(200).json({ success: true, message: 'Notification list added' });
            });
        };
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
        this.createSocialMediaList = function (req, res, next) {
            _this.model.updateOne({ active: true }, {
                $push: {
                    'contact': {
                        createdBy: req.user && req.user._id || null,
                        name: req.body.name,
                        logoURL: req.body.logoURL,
                        landingLink: req.body.landingLink,
                    }
                }
            }).exec(function (err, result) {
                if (err) {
                    console.log(err);
                    return res.status(200).json({ success: false, message: 'Unable to update Contact' });
                }
                return res.status(200).json({ success: true, message: 'Notification list added' });
            });
        };
    }
    return SettingsController;
}());
exports.default = SettingsController;
//# sourceMappingURL=settings.controller.js.map