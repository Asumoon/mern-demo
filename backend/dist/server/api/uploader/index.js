"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var uploader_controller_1 = require("./uploader.controller");
var controller = new uploader_controller_1.default();
var auth_service_1 = require("../../auth/auth.service");
var auth = new auth_service_1.default();
/**
 * @openapi
 * /api/uploader:
 *   post:
 *     tags:
 *     - Uploader
 *     summary: Add New Image
 *     description: Add New Image
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: file not found
 */
router.post('/', auth.isAuthenticated(), controller.fileUpload);
/**
 * @openapi
 * /api/uploader/{id}:
 *   delete:
 *     tags:
 *     - Uploader
 *     summary: Delete a single image
 *     description: Delete a single image
 *     parameters:
 *      - name: id
 *        in: path
 *        description: File Name
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: Unable to Delete.
 */
router.delete('/:id', auth.isAuthenticated(), controller.deleteFile);
module.exports = router;
//# sourceMappingURL=index.js.map