"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
// import * as multer from 'multer';
// import * as GridFsStorage from 'multer-gridfs-storage';
var config_1 = require("../../config");
var config = (0, config_1.default)(process.env.NODE_ENV);
var gridImageOrFile_controller_1 = require("./gridImageOrFile.controller");
var imageController = new gridImageOrFile_controller_1.default();
router.get('/image/:infoGather/:id', imageController.informationGathering, imageController.streamNewsImage);
module.exports = router;
//# sourceMappingURL=index.js.map