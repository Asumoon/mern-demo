"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gfsFile_model_1 = require("./gfsFile.model");
// import BaseCtrl from './../base';
var mongoose = require("mongoose");
var mime = require('mime-types');
var ObjectId = require('mongodb').ObjectId;
var conn = mongoose.connection;
var gfs = new mongoose.mongo.GridFSBucket(conn.db);
var connection = mongoose.connection;
var lodash_1 = require("lodash");
var ActivityLogCtrl = /** @class */ (function () {
    function ActivityLogCtrl() {
        var _this = this;
        this.model = gfsFile_model_1.default;
        this.justFileInfo = function (req, res, next) {
            if (!req.fileId) {
                return next();
            }
            gfsFile_model_1.default.findOne({
                _id: req.fileId
            }, function (err, file) {
                req.file = file;
                return next();
            });
        };
        this.fileInfo = function (req, res, next) {
            gfsFile_model_1.default.findOne({
                _id: req.params.fileId
            }, function (err, file) {
                var resJson;
                var extension;
                if (!err && file) {
                    if (file) {
                        resJson = JSON.parse(JSON.stringify(file));
                        extension = mime.extension(resJson.contentType) || 'pdf';
                        resJson['extension'] = '.' + extension;
                    }
                    res.json(resJson);
                }
                else {
                    return res.json({ status: 204, message: 'Unable to find file', err: err });
                }
            });
        };
        this.getfileExtension = function (req, res, next) {
            gfsFile_model_1.default.findOne({
                _id: req.params.fileId
            }, function (err, file) {
                var resJson;
                if (file) {
                    resJson = JSON.parse(JSON.stringify(file));
                    req.extension = mime.extension(resJson.contentType) || 'pdf';
                    next();
                }
            });
        };
        this.getStreamOfUploadedFile = function (req, res, next) {
            req.extension = req.extension || 'pdf';
            switch (req.extension) {
                case 'pdf':
                    res.setHeader('Content-Type', 'application/pdf');
                    break;
                case 'png':
                    res.setHeader('Content-Type', 'image/png');
                    break;
            }
            // res.setHeader('Content-Disposition', 'attachment; filename=foo.pdf');
            var readstream = gfs.openDownloadStream(ObjectId(req.params.fileId));
            readstream.pipe(res);
        };
        this.deleteOne = function (fileId, callback) {
            gfs.delete(ObjectId(fileId), (function (err, d) {
                return callback('Deleted');
            }));
        };
        this.deleteFile = function (req, res, next) {
            var fileId = req.params.fileId || req.removeThisFileId;
            console.log('Required FIle That Need to Remove ======> ', fileId);
            _this.deleteOne(fileId, function (resp) {
                return res.send(resp);
            });
        };
        this.deleteFileAndStartUpdate = function (req, res, next) {
            if (!req.file) {
                return next();
            }
            else {
                console.log('we can delete file => ', req.body.oldFileId);
                var fileId = req.body.oldFileId;
                if (fileId) {
                    _this.deleteOne(fileId, function (resp) {
                        return next();
                    });
                }
                else {
                    return next();
                }
            }
        };
        this.allImage = function (req, res, next) {
            gfsFile_model_1.default.find({}).exec(function (err, file) {
                if (file) {
                    var allImage_1 = [];
                    (0, lodash_1.each)(file, function (i) {
                        if (i.contentType === 'image/jpeg' || 'image/gif') {
                            allImage_1.push(i._id);
                        }
                    });
                    req.allImage = allImage_1;
                    return next();
                }
                else {
                    return next();
                }
            });
        };
        this.checkObjectId = function (req, res, next) {
            if (_this.checkIdAsParam(req.params.fileId) === false) {
                return res.status(500).json({ message: 'Invalid ID detected' });
            }
            return next();
        };
        this.checkIdAsParam = function (checkID) {
            // console.log('C H E C K  I D -->  ', checkID, /^[a-f\d]{24}$/i.test(checkID));
            return /^[a-f\d]{24}$/i.test(checkID);
        };
    }
    return ActivityLogCtrl;
}());
exports.default = ActivityLogCtrl;
//# sourceMappingURL=gfsFile.controller.js.map