"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var multer = require('multer');
var path = require("path");
// remove file case
var fs = require('fs');
var promisify = require('util').promisify;
var unlinkAsync = promisify(fs.unlink);
// remove file case ends
var storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var fileFilter = function (req, file, cb) {
    var allowedMimes = ['image/svg+xml', 'image/jpeg', 'image/pjpeg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb({
            success: false,
            message: 'Invalid file type. Only svg, jpg, png image files are allowed.'
        }, false);
    }
};
var fileSizeLimit = 1 * 1024 * 1024; // 1 MB
var upload = multer({
    storage: storage,
    limits: { fileSize: fileSizeLimit },
    fileFilter: fileFilter
}).single('file');
var UploaderController = /** @class */ (function () {
    function UploaderController() {
        var _this = this;
        this.fileUpload = function (req, res) {
            upload(req, res, function (err) {
                if (err) {
                    var _message = 'Upload failed';
                    if (err.code == 'LIMIT_FILE_SIZE') {
                        _message = 'File Size is too large. Allowed file size is 1MB';
                    }
                    return res.send({ success: false, message: _message, err: err });
                }
                else {
                    if (!req.file) {
                        return res.json({ status: 500, message: 'file not found' });
                    }
                    return res.send({
                        success: true,
                        message: 'File uploaded successfully',
                        fileName: "".concat(req.file.filename),
                        fileRoute: "".concat(req.file.path),
                    });
                }
            });
        };
        this.deleteFile = function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var filePath;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = "public/uploads/".concat(req.params.id);
                        return [4 /*yield*/, unlinkAsync(filePath, function (err) {
                                if (err) {
                                    return res.json({ status: 500, success: false, message: 'File not found', err: err });
                                }
                                return res.send({ success: true, message: 'Successfully deleated' });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.deleteFileWithURL = function (fileURL) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var filePath;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = fileURL;
                        return [4 /*yield*/, unlinkAsync(filePath, function (err) {
                                if (err) {
                                    console.log('File not found');
                                }
                                console.log('Successfully deleated');
                                return;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
    }
    return UploaderController;
}());
exports.default = UploaderController;
//# sourceMappingURL=uploader.controller.js.map