"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gallery_model_1 = require("./gallery.model");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var GalleryController = /** @class */ (function () {
    function GalleryController() {
        var _this = this;
        this.model = gallery_model_1.default;
        this.getDetail = function (req, res, next) {
            _this.model.find({}).sort({ createdAt: 1 }).exec(function (_err, data) {
                if (!_err) {
                    return res.json({ status: 200, message: 'success', data: data });
                }
                else {
                    return res.json({ status: 204, message: 'Unable to get lists', data: data });
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
            if (!req.file) {
                console.log('file is not Uploaded Please Upload file...');
            }
            console.log('file detail ', req.file);
            var _gallery = {
                createdBy: req.user && req.user._id || null,
                // communityName: req.body.communityName,
                // communityLogo: req.body.communityLogo,
                // communityMember: req.body.communityMember,
                // communityLink: req.body.communityLink
            };
            _this.model.create(_gallery, function (err, data) {
                if (!err) {
                    return res.json({ status: 200, message: 'success', data: _gallery });
                }
                else {
                    return res.json({ status: 204, message: 'Unable to create', err: err, data: _gallery });
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
                                // communityName: req.body.communityName,
                                // communityLogo: req.body.communityLogo,
                                // communityMember: req.body.communityMember,
                                // communityLink: req.body.communityLink
                            }
                        }).exec(function (err, data) {
                            if (!err) {
                                return res.json({ status: 200, message: 'success', data: updateData });
                            }
                            else {
                                return res.json({ status: 204, message: 'Unable to Update', err: err, data: updateData });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); };
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
    }
    return GalleryController;
}());
exports.default = GalleryController;
//# sourceMappingURL=gallery.controller.js.map