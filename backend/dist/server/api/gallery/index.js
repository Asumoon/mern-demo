"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var gallery_controller_1 = require("./gallery.controller");
var controller = new gallery_controller_1.default();
var auth_service_1 = require("../../auth/auth.service");
var auth = new auth_service_1.default();
var multer = require("multer");
var GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
// import * as GridFsStorage from 'multer-gridfs-storage';
var config_1 = require("../../config");
var config = (0, config_1.default)(process.env.NODE_ENV);
var storage = GridFsStorage({
    url: config.database_URI,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true, // No longer use in latest Mongoose
});
var upload = multer({
    storage: storage,
    limits: {
        fileSize: config.UPLOAD_FILE_SIZE_LIMIT
    }
});
/**
 * @openapi
 * /api/gallery:
 *   get:
 *     tags:
 *     - Gallery
 *     summary: Get all Gallery
 *     description:  Detail about Gallery
 *     responses:
 *       200:
 *         description: success
 *       204:
 *         description: Unable to get lists
 */
router.get('/', controller.getDetail);
/**
 * @openapi
 * /api/gallery:
 *   post:
 *     tags:
 *     - Gallery
 *     summary: Add New Image to Gallery
 *     description: Add New Image to Gallery
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schema/gallery'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/galleryResponse'
 *       204:
 *         description: Unable to create
 */
router.post('/', upload.single('file'), controller.createNew);
/**
 * @openapi
 * /api/gallery/{id}:
 *   get:
 *     tags:
 *     - Gallery
 *     summary: Get Single item
 *     description: Detail about single item
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ObjectId
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *       204:
 *         description: Unable to get lists
 */
router.get('/:id', auth.isAuthenticated(), controller.getSingleDetail);
// /**
//  * @openapi
//  * /api/gallery/{id}:
//  *   put:
//  *     tags:
//  *     - Gallery
//  *     summary: Get Item to update for a gallery Category
//  *     description: Update  gallery Category
//  *     parameters:
//  *      - name: id
//  *        in: path
//  *        description: ObjectId of the gallery item
//  *        required: true
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *           schema:
//  *              $ref: '#/components/schema/gallery'
//  *     responses:
//  *       200:
//  *         description: success
//  *         content:
//  *          application/json:
//  *           schema:
//  *              $ref: '#/components/schema/galleryResponse'
//  *       204:
//  *         description: Unable to Update.
//  */
// router.put('/:id', auth.isAuthenticated(), controller.updateSingle);
/**
 * @openapi
 * /api/gallery/{id}:
 *   delete:
 *     tags:
 *     - Gallery
 *     summary: Delete a single gallery image
 *     description: Delete a single gallery image
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ObjectId of the Gallery
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: Unable to Delete.
 */
router.delete('/:id', auth.isAuthenticated(), controller.deleteSingle);
module.exports = router;
//# sourceMappingURL=index.js.map