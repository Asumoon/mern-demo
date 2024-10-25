"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gfsFile_controller_1 = require("./gfsFile.controller");
var controller = new gfsFile_controller_1.default();
var express = require('express');
var router = express.Router();
var auth_service_1 = require("../../auth/auth.service");
var auth = new auth_service_1.default();
// import * as multer from 'multer';
// import * as GridFsStorage from 'multer-gridfs-storage';
var config_1 = require("../../config");
var config = (0, config_1.default)(process.env.NODE_ENV);
router.post('/file/:fileId', auth.isAuthenticated(), controller.getStreamOfUploadedFile);
/**
 * @openapi
 * /api/file/{fileId}:
 *   get:
 *     tags:
 *     - File
 *     summary: Get file information
 *     description: Get file detail information
 *     parameters:
 *      - name: fileId
 *        in: path
 *        description: ObjectId of the file
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *       204:
 *         description: message Unable to find file
 *       500:
 *         description: Invalid ID detected
 *
 */
router.get('/:fileId', controller.checkObjectId, controller.fileInfo);
// router.get('/stream/:fileId/source.pdf', controller.getStreamOfUploadedFile);
/**
 * @openapi
 * /api/file/stream/{fileId}:
 *   get:
 *     tags:
 *     - File
 *     summary: Get file
 *     description: Get file detail
 *     parameters:
 *      - name: fileId
 *        in: path
 *        description: ObjectId of the file
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *       204:
 *         description: message Unable to find file
 *       500:
 *         description: Invalid ID detected
 *
 */
router.get('/stream/:fileId', controller.checkObjectId, controller.getfileExtension, controller.getStreamOfUploadedFile);
router.get('/stream/:fileId/:type', controller.checkObjectId, controller.getStreamOfUploadedFile);
/**
 * @openapi
 * /api/file/delete-file/{fileId}:
 *   delete:
 *     tags:
 *     - File
 *     summary: Delete single file
 *     description: Delete single file
 *     parameters:
 *      - name: fileId
 *        in: path
 *        description: ObjectId of the file
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: Unable to Delete.
 *       500:
 *         description: Invalid ID detected
 */
router.delete('/delete-file/:fileId', controller.checkObjectId, auth.isAuthenticated(), controller.deleteFile);
module.exports = router;
//# sourceMappingURL=index.js.map